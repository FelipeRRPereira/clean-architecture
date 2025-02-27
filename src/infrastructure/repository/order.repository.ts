import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order_item'
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel, as: 'items' }],
      },
    )
  }

  async update(entity: Order): Promise<void> {
    const orderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: [{ model: OrderItemModel, as: 'items' }],
    })

    if (!orderModel) {
      throw new Error('Order not found')
    }

    await orderModel.update({
      customer_id: entity.customerId,
      total: entity.total(),
    })

    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    })

    const newItems = entity.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }))

    await OrderItemModel.bulkCreate(newItems)
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel, as: 'items' }],
    })

    if (!orderModel) {
      throw new Error('Order not found')
    }

    const orderItems = orderModel.items.map(
      item =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        ),
    )

    const order = new Order(id, orderModel.customer_id, orderItems)
    return order
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: 'items' }],
    })

    return orders.map(order => {
      const orderItems = order.items.map(
        item =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
          ),
      )
      return new Order(order.id, order.customer_id, orderItems)
    })
  }
}
