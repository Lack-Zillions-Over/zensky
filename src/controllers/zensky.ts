import { createHash } from 'crypto';
import { compress, decompress } from 'lzutf8';
import Redis from "ioredis";

class Zensky {
  protected client: Redis;
  private subscribers: Record<string, (message: string | Buffer) => void> = {};

  constructor() {
    this.client = new Redis(process.env.REDIS_URL, {
      password: process.env.REDIS_PASSWORD,
    });

    this._initialize();
  }

  private _initialize() {
    this.client.on("message", (channel, message) => {
      if (this.subscribers[channel]) {
        this.subscribers[channel](Buffer.isBuffer(message) ? message : this._decompress(message));
      }
    });
  }

  private _serialize(text: string) {
    return createHash('sha256').update(text).digest('hex');
  };

  private _compress<T>(value: T): string {
    return compress(JSON.stringify(value), { outputEncoding: 'Base64' });
  }

  private _decompress<T>(value: string): T {
    return JSON.parse(decompress(value, { inputEncoding: 'Base64', outputEncoding: 'String' }));
  }

  /**
   * @description Publishes a message to a channel or multiple channels
   */
  public publish<T>(value: T | string | Buffer, ...channels: string[]): void {
    for (const channel of channels) {
      this.client.publish(this._serialize(channel), Buffer.isBuffer(value) ? value : this._compress(value));
    }
  }

  /**
   * @description Subscribes to a channel or multiple channels
   */
  public subscribe<T>(callback: (message: T | string | Buffer) => void, ...channels: string[]): void {
    channels = channels.map((channel) => this._serialize(channel));

    for (const channel of channels) {
      this.subscribers[channel] = callback;
    }

    this.client.subscribe(...channels, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

export default Zensky;
