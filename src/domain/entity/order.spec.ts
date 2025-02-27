import Order from './order'
import OrderItem from './order_item'

describe('Order unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', [])
    }).toThrow('Id is required')
  })

  it('Should throw error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '', [])
    }).toThrow('CustomerId is required')
  })

  it('Should throw error when items is empty', () => {
    expect(() => {
      let order = new Order('123', '123', [])
    }).toThrow('Items are required')
  })

  it('Should calculate total', () => {
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 5)
    const item2 = new OrderItem('i1', 'Item 1', 200, 'p1', 10)
    const order = new Order('o1', 'c1', [item1])

    let total = order.total()
    expect(total).toBe(500)

    const order2 = new Order('o1', 'c1', [item1, item2])
    total = order2.total()

    expect(total).toBe(2500)
  })

  it('Should throw error if the item qte is less or equal 0', () => {
    expect(() => {
      const item = new OrderItem('i1', 'Item 1', 100, 'p1', 0)
      const order = new Order('o1', 'c1', [item])
    }).toThrow('Quantity must be greater than 0')
  })
})
