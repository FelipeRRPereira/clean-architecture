import Product from './product'

describe('Product unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100)
    }).toThrow('product: Id is required')
  })

  it('Should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100)
    }).toThrow('product: Name is required')
  })

  it('Should throw error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Product', -1)
    }).toThrow('product: Price must be greater than zero')
  })

  it('Should throw error when name is empty and price is less than zero', () => {
    expect(() => {
      new Product('123', '', -1)
    }).toThrow(
      'product: Name is required,product: Price must be greater than zero',
    )
  })

  it('Should change name', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changeName('Product 2')

    expect(product.name).toBe('Product 2')
  })

  it('Should change price', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changePrice(150)

    expect(product.price).toBe(150)
  })
})
