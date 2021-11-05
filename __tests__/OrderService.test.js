const pool = require('../lib/utils/pool');
const sendSMS = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');
const { updateOrder, deleteOrder } = require('../lib/services/OrderService');
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

  // POST Order
  it('tests the POST route (demo)', async () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        expect(sendSMS).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '2',
          quantity: 10,
        });
      });
  });

  // UPDATE Order
  it('Updates an order in the DB and sends a confirmation text message', async () => {
    const order = await Order.insert(2);
    const updatedOrder = await updateOrder(order.id, 4);
    expect(updatedOrder).toEqual({ id: '2', quantity: 4 });
  });

  // Delete Order
  it('Deletes an order in the DB and sends a confirmation text message', async () => {
    const order = await deleteOrder('1').get('/api/vi/orders');

    expect(order).toEqual({
      id: '1',
      quantity: 10,
    });
  });
});
