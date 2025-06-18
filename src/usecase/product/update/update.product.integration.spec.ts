import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequilize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequilize/product.repository'
import UpdateProductUseCase from './update.product.usecase'
import Product from '../../../domain/product/entity/product'

describe("Integration Test UpdateProductUseCase", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product A",
      price: 100,
    };

    await productRepository.create(new Product(input.id, input.name, input.price));

    const updateInput = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };
    
    const output = await usecase.execute(updateInput);
    expect(output).toEqual({
      id: "123",
      name: "Product A Updated",
      price: 150,
    });
  });

  it("should not update a product with missing name", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1234",
      name: "Product A",
      price: 100,
    };

    await productRepository.create(new Product(input.id, input.name, input.price));

    const updateInput = {
      id: "1234",
      name: "",
      price: 150,
    };

    await expect(usecase.execute(updateInput)).rejects.toThrow("Name is required");
  });

  it("should not update a product with missing price", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1235",
      name: "Product A",
      price: 100,
    };

    await productRepository.create(new Product(input.id, input.name, input.price));

    const updateInput = {
      id: "1235",
      name: "Product A Updated",
      price: -1,
    };

    await expect(usecase.execute(updateInput)).rejects.toThrow("product: Price must be greater than zero");
  });

  it("should not update a non-existing product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "non-existing-id",
      name: "Product A Updated",
      price: 150,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });
});