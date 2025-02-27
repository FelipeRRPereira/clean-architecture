import { Sequelize } from 'sequelize-typescript'
import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order_item'
import Product from '../../domain/entity/product'
import CustomerModel from '../db/sequelize/model/customer.model'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'
import ProductModel from '../db/sequelize/model/product.model'
import CustomerRepository from './customer.repository'
import ProductRepository from './product.repository'
import OrderRepository from './order.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    })
  })

  it('should update a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const product2 = new Product('234', 'Product 2', 10)
    await productRepository.create(product2)

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2,
    )

    const order2 = new Order('123', '123', [orderItem, orderItem2])

    await orderRepository.update(order2)

    const orderModel = await OrderModel.findOne({
      where: { id: order2.id },
      include: [{ model: OrderItemModel, as: 'items' }],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order2.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order2.id,
          product_id: product.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order2.id,
          product_id: product2.id,
        },
      ],
    })
  })

  it('should throw an error when order not found in update method', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )

    const order = new Order('823838', '123', [orderItem])

    const orderRepository = new OrderRepository()

    await expect(orderRepository.update(order)).rejects.toThrow(
      'Order not found',
    )
  })

  it('should throw an error when order not found', async () => {
    const orderRepository = new OrderRepository()
    await expect(orderRepository.find('193948')).rejects.toThrow(
      'Order not found',
    )
  })

  it('should be return order in find method', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    expect(await orderRepository.find('123')).toStrictEqual(order)
  })

  it('should be return all orders', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )
    const order = new Order('123', '123', [orderItem])
    await orderRepository.create(order)

    const product2 = new Product('124', 'Product 1', 10)
    await productRepository.create(product2)

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2,
    )
    const order2 = new Order('124', '123', [orderItem2])
    await orderRepository.create(order2)

    expect(await orderRepository.findAll()).toStrictEqual([order, order2])
  })
})
