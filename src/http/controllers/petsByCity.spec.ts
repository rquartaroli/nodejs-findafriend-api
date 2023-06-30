import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import fs from "fs"
import { app, pathSaveImages } from '../../app';

describe('Pets by city (e2e)', () => {
  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })

  it('should be able find a pets by city', async() => {
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

    const pathImageForTest = `${pathSaveImages}/test_e2e/image_for_use_of_test_e2e.jpg`

    await request(app.server).post('/add_pet')
    .set('Authorization', `Bearer ${authenticatedRes.body.token}`)
    .field('name', 'Dog Doe')
    .field('about', 'Dog for example')
    .field('age', 'Filhote')
    .field('size_carry', 'Pequenino')
    .field('energy_level', 'Muita')
    .field('independence_level', 'Alto')
    .field('environment', 'medio')
    .field('requirements_adoption', JSON.stringify(["ser atencioso", "ambiente estruturado para cachorro"]))
    .field('organization_Id', loginDone.body.organization.id)
    .attach('photos', pathImageForTest)

    const dirImages = `${pathSaveImages}/test_e2e/`
    const images = fs.readdirSync(dirImages)
    const imageAdded = images[0]
    const pathImageAdded = `${dirImages}/${imageAdded}`

    fs.unlink(pathImageAdded, (err) => {
      if (err) {
        console.error(`Erro ao excluir o arquivo ${pathImageAdded}: ${err.message}`);
        return;
      }
    })

    const response = await request(app.server).get('/petsByCity/?city=Salto')

    expect(response.statusCode).toEqual(200)
  })
})