const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );
    const order = await Order.insert(quantity);
    return order;
  }

  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order number ${id} updated, new quantity:  ${quantity}`
    );
    const order = await Order.update(id, quantity);
    return order;
  }

  static async deleteOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order number ${id} has been deleted.`
    );
    const order = await Order.delete(id);
    return order;
  }
};
