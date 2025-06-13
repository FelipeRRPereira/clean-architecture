import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequilize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequilize/product.repository'
import FindProductUseCase from './find.product.usecase'
import Product from '../../../domain/product/entity/product'

describe("Integration Test FindProductUseCase", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    await productRepository.create(
      new Product("123", "Product A", 100)
    );

    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: "123",
      name: "Product A",
      price: 100,
    });
  });

  it("should not find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "non-existing-id",
    };

    await expect(usecase.execute(input)).rejects.toThrow('Product not found');
  });
})