import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = [];

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if(!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if(!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: 'organization-1',
      name_organization: data.name_organization,
      name_responsible: data.name_responsible,
      email: data.email,
      city: data.city,
      state: data.state,
      cep: data.cep,
      address: data.address,
      whatsapp_num: data.whatsapp_num,
      password_hash: data.password_hash,
      created_at: new Date(),
    } 
    this.items.push(organization)

    return organization
  }
  
}