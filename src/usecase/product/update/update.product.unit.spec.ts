import Product from '../../../domain/product/entity/product'
import UpdateProductUseCase from './update.product.usecase'

const product = new Product('123', 'Product A', 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test UpdateProductUseCase", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };
    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: "123",
      name: "Product A Updated",
      price: 150,
    });
  });

  it("should not update a product with missing name", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "123",
      name: "",
      price: 150,
    };

    await expect(usecase.execute(input)).rejects.toThrow("product: Name is required");
  });

  it("should not update a product with missing price", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product A Updated",
      price: -1,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      'product: Price must be greater than zero',
    )
  });
});