import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { FindAllPetsByCityUseCase } from "../find-all-pets-by-city"

export function makeFindAllPetsByCityUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const allPetsByCityUseCase = new FindAllPetsByCityUseCase(prismaPetsRepository)

  return allPetsByCityUseCase
}