import { toXML } from 'jstoxml';
import { ListCustomerOutputDto } from '../../../usecase/customer/list/list.customer.dto'

export default class CustomerPresenter {
  static listXML(data: ListCustomerOutputDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    };

    return toXML({
      customers: data.customers.map(customer => ({
        customer: {
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
          },
        },
      })),
    }, xmlOptions);
  }     
}
