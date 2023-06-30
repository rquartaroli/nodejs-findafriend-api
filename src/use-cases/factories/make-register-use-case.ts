import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const registerUseCase = new RegisterUseCase(prismaOrganizationsRepository)

  return registerUseCase
}