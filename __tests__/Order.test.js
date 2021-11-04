const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Order class tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // Get by ID
  it('gets one order by id', async () => {
    const expected = await Order.insert(1);
    const actual = await Order.getId(expected.id);
    expect(actual).toEqual(expect.arrayContaining([expected]));
  });

  // Get ALL
  it('gets all orders', async () => {
    const o1 = await Order.insert(1);
    const o2 = await Order.insert(2);
    const o3 = await Order.insert(3);

    const orders = await Order.getAll();
    expect(orders).toEqual(expect.arrayContaining([o1, o2, o3]));
  });
});