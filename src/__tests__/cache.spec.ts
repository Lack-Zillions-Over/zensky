import { Zensky } from "../controllers/index";

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {
    return {
      subscribe: jest.fn(),
      publish: jest.fn(),
      on: jest.fn(),
    }
  });
});

const setupSut = () => {
  const sut = new Zensky();
  return { sut };
};

describe('Zensky Suite Tests', () => {
  test('should subscribe channel', async () => {
    const { sut } = setupSut();
    expect(sut.subscribe(
      () => {
        return true;
      },
      'channel1',
    )).toBeUndefined();
  });

  test('should publish channel', async () => {
    const { sut } = setupSut();
    expect(sut.publish(
      'testing',
      'channel1',
    )).toBeUndefined();
  });
});
