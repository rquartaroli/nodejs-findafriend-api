import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findAllPetsByCityWithFiltersToo(
    city: string, 
    age?: string, 
    size_carry?: string, 
    energy_level?: string, 
    independence_level?: string
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}