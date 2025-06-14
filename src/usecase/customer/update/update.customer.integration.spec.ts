import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import UpdateCustomerUseCase from './update.customer.usecase'
import Customer from '../../../domain/customer/entity/customer'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'

describe("Integration Test UpdateCustomerUseCase", () => {
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

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const input = {
      name: "Customer A",
    };

    const customer = CustomerFactory.createWithAddress(input.name, new Address("Street A", 1, "Zip A", "City A"));
    await customerRepository.create(customer);

    const updateInput = {
      id: customer.id,
      name: "Customer A Updated",
      address: {
        street: "Street A",
        number: 2,
        zip: "Zip A",
        city: "City A",
      },
    };

    const output = await usecase.execute(updateInput);
    expect(output).toEqual({
      id: customer.id,
      name: "Customer A Updated",
      address: {
        street: "Street A",
        number: 2,
        zip: "Zip A",
        city: "City A",
      },
    });
  });
});