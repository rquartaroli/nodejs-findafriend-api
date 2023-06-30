import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pet-repository";
import { InMemoryOrganizationsRepository } from "./in-memory-organizations-repository";
import { hash } from "bcryptjs";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];
  public itemsOrganizations = new InMemoryOrganizationsRepository()

  async findAllPetsByCityWithFiltersToo(
    city: string,
    age?: string, 
    size_carry?: string, 
    energy_level?: string, 
    independence_level?: string,
  ) {
    await this.itemsOrganizations.create({
      name_organization: 'Example Organization',
      name_responsible: 'John Doe',
      email: 'johndoe@example.com',
      city: 'Salto',
      state: 'SP',
      cep: '13320000',
      address: 'R. Example',
      whatsapp_num: '11999999999',
      password_hash: await hash('123456', 6),
    })

    let organizationsID: string[] = []
    this.itemsOrganizations.items.filter((item) => {
      if(item.city === city) {
        organizationsID.push(item.id)
      }
    })

    let onlyCity = true

    if( age || size_carry || energy_level || independence_level ) {
      onlyCity = false
    }

    const petsByOrganizationsID = organizationsID.map((organization) => {
      return this.items.filter((item) => {
        if(onlyCity) {
          return item.organization_Id === organization
        } else {
          if(item.organization_Id === organization 
            && item.age === age 
            && item.size_carry === size_carry 
            && item.energy_level === energy_level 
            && item.independence_level === independence_level) {
              return true
          } else {
            return false
          }
        }
      })
    })

    const allPets = petsByOrganizationsID.flat()

    return allPets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 'pet-1',
      name: data.name,
      about: data.about,
      age: data.age,
      size_carry: data.size_carry,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      photos: data.photos as string[],
      requirements_adoption: data.requirements_adoption as string[],
      organization_Id: data.organization_Id,
    }
    this.items.push(pet)

    return pet
  }
  
}