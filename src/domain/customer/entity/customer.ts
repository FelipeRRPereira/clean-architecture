import EventDispatcher from '../../@shared/event/event-dispatcher'
import { CustomerAddressChangedEvent } from '../event/customer-address-changed.event'
import CustomerCreatedEvent from '../event/customer-created.event'
import Address from '../value-object/address'

export default class Customer {
  private _id: string
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(
    id: string,
    name: string,
    private readonly eventDispatcher?: EventDispatcher,
  ) {
    this._id = id
    this._name = name
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
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
