import ProductFactory from './product.factory'

describe("Product factory unit test", () => {
  it("should create a product type A", () => {
    const productFactory = ProductFactory.create("a", "Product A", 1)
    expect(productFactory.id).toBeDefined()
    expect(productFactory.name).toBe("Product A")
    expect(productFactory.price).toBe(1)
    expect(productFactory.constructor.name).toBe("Product")
  })

  it('should create a product type B', () => {
    const productFactory = ProductFactory.create('b', 'Product B', 1)
    expect(productFactory.id).toBeDefined()
    expect(productFactory.name).toBe('Product B')
    expect(productFactory.price).toBe(2)
    expect(productFactory.constructor.name).toBe('ProductB')
  })

  it('should throw an error when product type is not supported', () => {
    expect(() => ProductFactory.create('c', 'Product C', 1)).toThrow(
      'Product type not supported'
    )
  })
})