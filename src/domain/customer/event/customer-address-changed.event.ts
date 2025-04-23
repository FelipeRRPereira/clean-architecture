import EventInterface from '../../@shared/event/event.interface'

export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date
  eventData: any

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: string,
  ) {
    this.dataTimeOccurred = new Date()
  }
}
