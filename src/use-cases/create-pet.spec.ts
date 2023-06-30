import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet register', async () => {
    const { pet } = await sut.execute({
      name: 'Dog Doe',
      about: 'Dog for example',
      age: 'Filhote',
      size_carry: 'Pequenino',
      energy_level: 'Muita',
      independence_level: 'Alto',
      environment: 'medio',
      photos: ['http://example.com/dog_doe'],
      requirements_adoption: ['ser atencioso', 'ambiente estruturado para cachorro'],
      organization_Id: 'organization-1',
    })

    expect(pet.id).toEqual(expect.any(String))

  })
})