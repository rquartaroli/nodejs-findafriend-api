import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { OrganizationAlreadyExistsError } from "../../use-cases/errors/organization-already-exists-error"
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case"

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name_organization: z.string(),
    name_responsible: z.string(),
    email: z.string().email(),
    city: z.string(),
    state: z.string().length(2).toUpperCase(),
    cep: z.string(),
    address: z.string(),
    whatsapp_num: z.string(),
    password: z.string().min(6),
  })

  const {
    name_organization,
    name_responsible,
    email,
    city,
    state,
    cep,
    address,
    whatsapp_num,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name_organization,
      name_responsible,
      email,
      city,
      state,
      cep,
      address,
      whatsapp_num,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if(err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    
    throw err
  }
}