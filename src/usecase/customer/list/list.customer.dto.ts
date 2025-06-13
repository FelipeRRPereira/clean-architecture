export interface ListCustomerDto {}

type Customer = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface ListCustomerOutputDto {
  customers: Customer[];
}