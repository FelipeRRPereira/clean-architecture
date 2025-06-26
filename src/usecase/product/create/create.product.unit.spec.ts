import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import CreateProductUseCase from './create.product.usecase'

const input = {
  type: "a",
  name: "Product 1",
  price: 100,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit Test CreateProductUseCase", () => {
  let productRepository: ProductRepositoryInterface;
  let usecase: CreateProductUseCase;

  beforeEach(() => {
    productRepository = MockRepository();
    usecase = new CreateProductUseCase(productRepository);
  });

  it("should create a product", async () => {
    const output = await usecase.execute(input);
    expect(productRepository.create).toHaveBeenCalled();
    expect(output).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
      type: "a",
    });
  });

  it("should throw an error when name is missing", async () => {
    input.name = "";
    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is missing", async () => {
    input.name = "Product 1";
    input.price = -1;
    await expect(usecase.execute(input)).rejects.toThrow(
      'product: Price must be greater than zero',
    )
  });
})