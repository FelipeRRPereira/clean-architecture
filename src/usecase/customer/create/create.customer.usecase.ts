import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import Address from '../../../domain/customer/value-object/address'
import { CreateCustomerDto, CreateCustomerOutputDto } from './create.customer.dto'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'

export default class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: CreateCustomerDto): Promise<CreateCustomerOutputDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name, 
      new Address(
        input.address.street, 
        input.address.number, 
        input.address.zip, 
        input.address.city
      )
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      }
    };
  }
}
