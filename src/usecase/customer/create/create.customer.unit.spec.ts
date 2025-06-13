import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import CreateCustomerUseCase from './create.customer.usecase'

const input = {
  name: "John Doe",
  address: {
    street: "Street 1",
    number: 123,
    zip: "Zipcode 123",
    city: "City 1"
  }
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit Test CreateCustomerUseCase", () => {
  let customerRepository: CustomerRepositoryInterface;
  let usecase: CreateCustomerUseCase;

  beforeEach(() => {
    customerRepository = MockRepository();
    usecase = new CreateCustomerUseCase(customerRepository);
  });

  it("should create a customer", async () => {
    const output = await usecase.execute(input);
    expect(customerRepository.create).toHaveBeenCalled();
    expect(output).toEqual({
      id: expect.any(String),
      name: "John Doe",
      address: {
        street: "Street 1",
        number: 123,
        zip: "Zipcode 123",
        city: "City 1"
      }
    });
  });

  it("should throw an error when name is missing", async () => {
    input.name = "";
    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    input.address.street = "";
    await expect(usecase.execute(input)).rejects.toThrow("Street is required");
  });

  it("should throw an error when number is missing", async () => {
    input.address.street = "Street 1";
    input.address.number = null;
    await expect(usecase.execute(input)).rejects.toThrow("Number is required");
  });

  it("should throw an error when zip is missing", async () => {
    input.address.street = "Street 1";
    input.address.number = 123;
    input.address.zip = "";
    await expect(usecase.execute(input)).rejects.toThrow("Zip is required");
  });

  it("should throw an error when city is missing", async () => {
    input.address.street = "Street 1";
    input.address.number = 123;
    input.address.zip = "Zipcode 123";
    input.address.city = "";
    await expect(usecase.execute(input)).rejects.toThrow("City is required");
  });
});