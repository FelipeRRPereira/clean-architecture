import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import CreateCustomerUseCase from './create.customer.usecase'

describe("Integration Test CreateCustomerUseCase", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "Customer A",
      address: {
        street: "Street A",
        number: 1,
        zip: "Zip A",
        city: "City A",
      },
    };

    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: "Customer A",
      address: {
        street: "Street A",
        number: 1,
        zip: "Zip A",
        city: "City A",
      },
    });
  });
});