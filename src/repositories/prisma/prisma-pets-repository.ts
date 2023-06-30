import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pet-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async findAllPetsByCityWithFiltersToo(
    city: string, 
    age?: string, 
    size_carry?: string, 
    energy_level?: string, 
    independence_level?: string,
  ): Promise<Pet[]> {
    let queryFilters = ""

    if(age) {
      queryFilters += `AND p.age = '${age}'`
    }
    if(size_carry) {
      queryFilters += ` AND p.size_carry = '${size_carry}'`
    }
    if(energy_level) {
      queryFilters += ` AND p.energy_level = '${energy_level}'`
    }
    if(independence_level) {
      queryFilters += ` AND p.independence_level = '${independence_level}'`
    }

    const allPets = await prisma.$queryRawUnsafe('SELECT * FROM pets p'
      +' INNER JOIN organizations o ON p."organization_Id" = o.id'
      +' WHERE '
      +` o.city = '${city}'`
      +` ${queryFilters}`
    ) as Pet[]

    return allPets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

}