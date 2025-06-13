import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import FindCustomerUseCase from './find.customer.usecase'

const customer = new Customer('123', 'John Doe')
const address = new Address('Street 1', 123, 'Zipcode 123', 'City 1')
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test FindCustomerUseCase", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    
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
  
  it("should not find a customer", async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: "123"
    }
    
    await expect(usecase.execute(input)).rejects.toThrow('Customer not found')
  })
}); 
