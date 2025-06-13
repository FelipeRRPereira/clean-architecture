import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequilize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequilize/product.repository'
import CreateProductUseCase from './create.product.usecase'

describe("Integration Test CreateProductUseCase", () => {
  let sequelize: Sequelize;
  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  }
  );

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "a",
      name: "Product 1",
      price: 100,
    };

    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
      type: "a",
    });
  });
})