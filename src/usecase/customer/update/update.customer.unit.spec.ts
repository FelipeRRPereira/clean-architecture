import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import UpdateCustomerUseCase from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address(
    'Street 1',
    123,
    'Zipcode 123',
    'City 1'
  )
)

const input = {
  id: customer.getId,
  name: 'John Doe Updated',
  address: {
    street: 'Street 1 Updated',
    number: 456,
    zip: 'Zipcode 456',
    city: 'City 1 Updated',
  },
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  }
}

describe('Unit test for update customer use case', () => {
  it('should update a customer', async () => {
    const repository = MockRepository()
    const usecase = new UpdateCustomerUseCase(repository)

    const output = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(repository.update).toHaveBeenCalled()
    expect(output).toEqual({
      id: customer.getId,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    })
  })

  it('should throw an error when customer is not found', async () => {
    const repository = MockRepository()
    repository.find.mockReturnValueOnce(Promise.resolve(null))
    const usecase = new UpdateCustomerUseCase(repository)

    await expect(usecase.execute(input)).rejects.toThrow('Customer not found')
  })
})