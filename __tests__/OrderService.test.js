const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');
// const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Order class tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    return await Order.insert(1);
  });

  // CREATE Order lives on app.test.js (demo)

  // UPDATE Order
  it('Updates an order in the DB and sends a confirmation text message', async () => {
    return await request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 10 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});
