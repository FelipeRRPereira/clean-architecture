import ProductFactory from '../../../domain/product/factory/product.factory'
import ListProductUseCase from './list.product.usecase'

const product1 = ProductFactory.create('a', 'Product 1', 10.0);
const product2 = ProductFactory.create('b', 'Product 2', 20.0);
const product3 = ProductFactory.create('a', 'Product 3', 30.0);
const product4 = ProductFactory.create('b', 'Product 4', 40.0);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2, product3, product4])),
    find: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  }
}

describe('Unit test for list product use case', () => {
  it('should list products', async () => {
    const repository = MockRepository()
    const usecase = new ListProductUseCase(repository)

    const output = await usecase.execute({})

    expect(repository.findAll).toHaveBeenCalled()
    expect(output.products.length).toBe(4)
    expect(output.products[0]).toEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price,
    })
    expect(output.products[1]).toEqual({
      id: product2.id,
      name: product2.name,
      price: product2.price,
    })
    expect(output.products[2]).toEqual({
      id: product3.id,
      name: product3.name,
      price: product3.price,
    })
    expect(output.products[3]).toEqual({
      id: product4.id,
      name: product4.name,
      price: product4.price,
    })
  })
})