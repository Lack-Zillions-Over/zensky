# LZO: Zensky

> Pub/Sub messaging using Redis.

[![Sponsor][sponsor-badge]][sponsor]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![TypeScript version][ts-badge]][typescript-4-9]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

## Installation

```bash
npm install lzo-zensky OR yarn add lzo-zensky
```

## Configuration

Please input the credentials of your Redis server in the `.env` file.

> See the example in the `.env.example` file.

```bash
REDIS_URL="redis://IP:PORT"
REDIS_PORT=6379
REDIS_PASSWORD="PASSWORD"
```

## Usage

```typescript
import { Zensky } from 'lzo-zensky';

// Node.js process or server
Zensky.subscribe(
  (value) => console.log(typeof value, value), // object, { name: 'John Doe' }
  'testing',
);

// Other Node.js process or server
setTimeout(() => {
  Zensky.publish({ name: 'John Doe' }, 'testing');
});
```

### Attention

> Not use same Zensky instance for subscribe and publish in same process.

## API

`Zensky.publish<T>(value: T | string | Buffer, ...channels: string[]): void`

> Publishes a message to a channel or multiple channels.

`Zensky.subscribe<T>(callback: (message: T | string | Buffer) => void, ...channels: string[]): void`

> Subscribes to a channel or multiple channels.

## Backers & Sponsors

Support this project by becoming a [sponsor][sponsor].

## License

Licensed under the MIT. See the [LICENSE](https://github.com/Lack-Zillions-Over/zensky/blob/main/LICENSE) file for details.

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen]: http://commitizen.github.io/cz-cli/
[ts-badge]: https://img.shields.io/badge/TypeScript-4.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2018.12.1-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[gha-badge]: https://github.com/Lack-Zillions-Over/zensky/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/Lack-Zillions-Over/zensky/actions/workflows/nodejs.yml
[typescript-4-9]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/Lack-Zillions-Over/zensky/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/Lack-Zillions-Over
