import Customer from '../../../domain/customer/entity/customer'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import { ListCustomerDto, ListCustomerOutputDto } from './list.customer.dto'

export default class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: ListCustomerDto): Promise<ListCustomerOutputDto> {
    const customers = await this.customerRepository.findAll();
    return {
      customers: CustomerMapper.toOutput(customers)
    };
  }
}

class CustomerMapper {
  static toOutput(customers: Customer[]) {
    return customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      }
    }));
  }
}