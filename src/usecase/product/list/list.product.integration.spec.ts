import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequilize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequilize/product.repository'
import ListProductUseCase from './list.product.usecase'
import Product from '../../../domain/product/entity/product'

describe("Integration Test ListProductUseCase", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    await productRepository.create(new Product("123", "Product A", 100));
    await productRepository.create(new Product("456", "Product B", 200));

    const output = await usecase.execute({});
    expect(output.products).toHaveLength(2);
    expect(output.products[0]).toEqual({
      id: "123",
      name: "Product A",
      price: 100,
    });
    expect(output.products[1]).toEqual({
      id: "456",
      name: "Product B",
      price: 200,
    });
  });
})