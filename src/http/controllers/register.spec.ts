import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from '../../app';

describe('Register (e2e)', () => {
  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })

  it('should be able to register', async() => {
    const response = await request(app.server).post('/organizations').send({
      name_organization: 'Example Organization',
      name_responsible: 'John Doe',
      email: 'johndoe@example.com',
      city: 'Salto',
      state: 'SP',
      cep: '13320000',
      address: 'R. Example',
      whatsapp_num: '11999999999',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)    
  })
})