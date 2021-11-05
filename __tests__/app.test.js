const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    // return await Order.insert(1);
    return await request(app).post('/api/v1/orders').send({ quantity: 10 });
  });

  // POST Order
  it('tests the POST route (demo)', async () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '2',
          quantity: 10,
        });
      });
  });

  // GET ALL Orders
  it('Responds with an array of all orders', async () => {
    return await request(app)
      .get('/api/v1/orders')
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual([
          {
            id: '1',
            quantity: 10,
          },
        ]);
      });
  });
});
