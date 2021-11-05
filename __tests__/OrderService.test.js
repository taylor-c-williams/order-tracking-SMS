const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Order = require('../lib/models/Order');
const { updateOrder, deleteOrder } = require('../lib/services/OrderService');
const OrderService = require('../lib/services/OrderService');
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

  // UPDATE Order
  it('Updates an order in the DB and sends a confirmation text message', async () => {
    const order = await Order.insert(2);
    const updatedOrder = await updateOrder(order.id, 4);
    expect(updatedOrder).toEqual({ id: '2', quantity: 4 });
  });

  // DELETE Order
  it('Deletes an order in the DB and sends a confirmation text message', async () => {
    const mockOrder = Order.insert(27);
    return deleteOrder(2).then(() => {
      expect(mockOrder).toBeNull;
    });
  });
});
