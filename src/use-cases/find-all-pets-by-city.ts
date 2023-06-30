import { Pet } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { PetsRepository } from "../repositories/pet-repository"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"

interface FindAllPetsByCityUseCaseRequest {
  city: string
  age?: string
  size_carry?: string
  energy_level?: string 
  independence_level?: string
}

interface FindAllPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FindAllPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    age,
    size_carry,
    energy_level,
    independence_level,
  }: FindAllPetsByCityUseCaseRequest): Promise<FindAllPetsByCityUseCaseResponse> {

    const cityCapitalized = capitalizeFirstLetter(city.toLowerCase())

    const pets = await this.petsRepository.findAllPetsByCityWithFiltersToo(
      cityCapitalized, 
      age,
      size_carry,
      energy_level,
      independence_level,
    )
  
    if(pets.length <= 0) {
      throw new ResourceNotFoundError()
    }
    
    return { pets }
  }
}