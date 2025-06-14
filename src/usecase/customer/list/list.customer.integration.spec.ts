import { Sequelize } from 'sequelize-typescript'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import Customer from '../../../domain/customer/entity/customer'
import ListCustomerUseCase from './list.customer.usecase'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import Address from '../../../domain/customer/value-object/address'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'

describe("Integration Test ListCustomerUseCase", () => {
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

  it("should list customers", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const customer1 = CustomerFactory.createWithAddress("Customer A", new Address("Street A", 1, "Zip A", "City A"));

    const customer2 = CustomerFactory.createWithAddress("Customer B", new Address("Street B", 2, "Zip B", "City B"));

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);
    const output = await usecase.execute({});
    expect(output.customers).toHaveLength(2);
    expect(output.customers[0]).toEqual({
      id: customer1.id,
      name: "Customer A",
      address: {
        street: "Street A",
        number: 1,
        zip: "Zip A",
        city: "City A",
      },
    });
    expect(output.customers[1]).toEqual({
      id: customer2.id,
      name: "Customer B",
      address: {
        street: "Street B",
        number: 2,
        zip: "Zip B",
        city: "City B",
      },
    });
  });
});