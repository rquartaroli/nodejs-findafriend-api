import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { FindAllPetsByCityUseCase } from './find-all-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: FindAllPetsByCityUseCase

describe('Find all pets by city Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindAllPetsByCityUseCase(petsRepository)
  })

  it('should be able find all pets by city', async () => {
    await petsRepository.create({
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

    const { pets } = await sut.execute({ city: 'Salto' })

    expect(pets.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able find all pets by city and all filters optionals', async () => {
    await petsRepository.create({
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

    const { pets } = await sut.execute({
      city: 'Salto',
      age: 'Filhote',
      size_carry: 'Pequenino',
      energy_level: 'Muita',
      independence_level: 'Alto',
    })

    expect(pets.length).toBeGreaterThanOrEqual(1)
  })

  it('should not be able find pets with wrong city', async () => {
    await petsRepository.create({
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

    await expect(() => 
      sut.execute({ city: 'Non-Existent-City' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able find pets with wrong filters', async () => {
    await petsRepository.create({
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

    await expect(() => 
      sut.execute({ 
        city: 'Salto',
        age: 'Non-Existent-Age',
        size_carry: 'Non-Existent-Size-Carry',
        energy_level: 'Non-Existent-Energy-Level',
        independence_level: 'Non-Existent-Independent-Level'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})