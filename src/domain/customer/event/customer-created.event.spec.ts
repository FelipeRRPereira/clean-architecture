import CustomerCreatedEvent from './customer-created.event'


describe('CustomerCreatedEvent', () => {
  it('should be correct data', () => {
    const event = new CustomerCreatedEvent({ id: '123', name: 'Felipe'})

    expect(event.eventData.id).toBe('123')
    expect(event.eventData.name).toBe('Felipe')
    expect(event.dataTimeOccurred).toBeInstanceOf(Date)
  })
})
