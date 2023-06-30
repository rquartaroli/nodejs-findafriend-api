import { hash } from "bcryptjs"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error"
import { Organization } from "@prisma/client"
import { extractNumbers } from "../utils/extractNumbers"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"

interface RegisterUseCaseRequest {
  name_organization: string
  name_responsible: string
  email: string
  city: string
  state: string
  cep: string
  address: string
  whatsapp_num: string
  password: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name_organization,
    name_responsible,
    email,
    city,
    state,
    cep,
    address,
    whatsapp_num,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const cityCapitalized = capitalizeFirstLetter(city.toLowerCase())
    const cepFormated = extractNumbers(cep)
    const whatsappFormated = extractNumbers(whatsapp_num)
    const password_hash = await hash(password, 6)
  
    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)
  
    if(organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }
    
    const organization = await this.organizationsRepository.create({
      name_organization,
      name_responsible,
      email,
      city: cityCapitalized,
      state,
      cep: cepFormated,
      address,
      whatsapp_num: whatsappFormated,
      password_hash,
    })

    return { organization }
  }
}