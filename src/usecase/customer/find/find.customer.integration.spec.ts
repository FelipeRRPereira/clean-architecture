
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import FindCustomerUseCase from './find.customer.usecase'

describe("Test FindCustomerUseCase", () => {
  let sequelize: Sequelize
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

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer("123", "John Doe")
    const address = new Address("Street 1", 123, "Zipcode 123", "City 1");
    customer.changeAddress(address)
    await customerRepository.create(customer)  

    const input = {
      id: "123"
    }
    const output = await usecase.execute(input)
    expect(output).toEqual({
      id: "123",
      name: "John Doe",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 123,
        zip: "Zipcode 123"
      }
    })
  })  
}); 
