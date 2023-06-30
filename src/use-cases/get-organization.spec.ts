import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { GetOrganizationUseCase } from './get-organization'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationUseCase

describe('Get Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationUseCase(organizationsRepository)
  })

  it('should be able to get organization', async () => {
    const createdOrganization = await organizationsRepository.create({
      name_organization: 'Example Organization',
      name_responsible: 'John Doe',
      email: 'johndoe@example.com',
      city: 'Salto',
      state: 'SP',
      cep: '13320000',
      address: 'R. Example',
      whatsapp_num: '11999999999',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id
    })

    expect(organization.name_responsible).toEqual('John Doe')
  })

  it('should not be able to get organization with wrong id', async () => {
    await expect(() => 
      sut.execute({
        organizationId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})