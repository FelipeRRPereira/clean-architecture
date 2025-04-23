import Customer from '../entity/customer'
import { v4 as uuid } from 'uuid'
import Address from '../value-object/address'
import EventDispatcher from '../../@shared/event/event-dispatcher'

export default class CustomerFactory {
  public static create(name: string, dispatcher?: EventDispatcher): Customer {
    const customer = new Customer(uuid(), name, dispatcher)
    customer.triggerCreationEvent()
    return customer
  }

  public static createWithAddress(
    name: string,
    address: Address,
    dispatcher?: EventDispatcher,
  ): Customer {
    const customer = new Customer(uuid(), name, dispatcher)
    customer.changeAddress(address)
    customer.triggerCreationEvent()
    return customer
  }
}
