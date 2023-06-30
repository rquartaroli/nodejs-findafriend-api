import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository"
import { GetOrganizationUseCase } from "../get-organization"

export function makeGetOrganizationUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const organizationUseCase = new GetOrganizationUseCase(prismaOrganizationsRepository)

  return organizationUseCase
}