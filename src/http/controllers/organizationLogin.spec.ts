import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from '../../app';

describe('Organization Login (e2e)', () => {
  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })

  it('should be able to login after create organization account', async() => {
    await request(app.server).post('/organizations').send({
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

    const authenticatedRes = await request(app.server).post('/session').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const loginDone = await request(app.server).get('/organizationLogin')
    .set('Authorization', `Bearer ${authenticatedRes.body.token}`)

    expect(loginDone.statusCode).toEqual(200)
  })
})