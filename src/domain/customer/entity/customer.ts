import Entity from '../../@shared/entity/entity.abstract'
import EventDispatcher from '../../@shared/event/event-dispatcher'
import NotificationError from '../../@shared/notification/notification.error'
import { CustomerAddressChangedEvent } from '../event/customer-address-changed.event'
import CustomerCreatedEvent from '../event/customer-created.event'
import Address from '../value-object/address'

export default class Customer extends Entity{
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(
    id: string,
    name: string,
    private readonly eventDispatcher?: EventDispatcher,
  ) {
    super()
    this.id = id
    this._name = name
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Id is required',
      })
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: 'customer',
        message: 'Name is required',
      })
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  get address(): Address {
    return this._address
  }

  changeAddress(address: Address) {
    this._address = address
    if (this.eventDispatcher) {
      this.eventDispatcher.notify(
        new CustomerAddressChangedEvent(this.id, this.name, address.toString()),
      )
    }
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(rewardPoints: number) {
    this._rewardPoints += rewardPoints
  }

  triggerCreationEvent(): void {
    if (this.eventDispatcher) {
      this.eventDispatcher.notify(new CustomerCreatedEvent({ id: this.id, name: this.name}))
    }
  }
}
