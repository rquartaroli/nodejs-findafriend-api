import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrganizationsRepository)

  return authenticateUseCase
}