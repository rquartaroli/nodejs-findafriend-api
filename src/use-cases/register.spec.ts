import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
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

    expect(organization.id).toEqual(expect.any(String))

  })

  it('should hash organization password upon registration', async () => {

    const { organization } = await sut.execute({
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

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {

    const email = 'johndoe@example.com'

    await sut.execute({
      name_organization: 'Example Organization',
      name_responsible: 'John Doe',
      email,
      city: 'Salto',
      state: 'SP',
      cep: '13320000',
      address: 'R. Example',
      whatsapp_num: '11999999999',
      password: '123456',
    })

    await expect(() => 
       sut.execute({
        name_organization: 'Example Organization',
        name_responsible: 'John Doe',
        email,
        city: 'Salto',
        state: 'SP',
        cep: '13320000',
        address: 'R. Example',
        whatsapp_num: '11999999999',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)

  })
})