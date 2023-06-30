import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pet-repository"

export interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: 'Filhote' | 'Adolescente' | 'Idoso'
  size_carry: 'Pequenino' | 'Medio' | 'Grande'
  energy_level: 'Baixa' | 'Pouca' | 'Consideravel' | 'Muita' | 'Elevada'
  independence_level: 'Baixo' | 'Mediano' | 'Alto'
  environment: 'reduzido' | 'medio' | 'amplo'
  photos: string[]
  requirements_adoption: string[]
  organization_Id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size_carry,
    energy_level,
    independence_level,
    environment,
    photos,
    requirements_adoption,
    organization_Id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size_carry,
      energy_level,
      independence_level,
      environment,
      photos,
      requirements_adoption,
      organization_Id,
    })

    return { pet }
  }
}