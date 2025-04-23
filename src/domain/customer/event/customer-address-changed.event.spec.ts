import { CustomerAddressChangedEvent } from './customer-address-changed.event'
import CustomerCreatedEvent from './customer-created.event'


describe('CustomerAddressChanged', () => {
  it('should be correct data', () => {
    const event = new CustomerAddressChangedEvent('123', 'Felipe', "Street")

    expect(event.id).toBe('123')
    expect(event.name).toBe('Felipe')
    expect(event.dataTimeOccurred).toBeInstanceOf(Date)
  })
})
