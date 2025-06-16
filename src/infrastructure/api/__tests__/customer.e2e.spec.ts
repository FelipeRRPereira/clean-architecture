import { app, sequelize } from '../express'
import request from 'supertest'

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Due",
      address: {
        street: "Street A",
        city: "City",
        number: 123,
        zip: "12345"
      }
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("John Due")
    expect(response.body.address.street).toBe("Street A")
    expect(response.body.address.city).toBe("City")
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe("12345")
  })

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe"
      })
    expect(response.status).toBe(500)
  })

  it("should list all customer", async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Due',
        address: {
          street: 'Street A',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })

    expect(response.status).toBe(200)

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Jane Due',
        address: {
          street: 'Street A',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })

    expect(response2.status).toBe(200)

    const listResponse = await request(app).get("/customer").send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer = listResponse.body.customers[0]
    expect(customer.name).toBe("John Due")
    expect(customer.address.street).toBe("Street A")

    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe("Jane Due")
    expect(customer2.address.street).toBe("Street A")
  })
})