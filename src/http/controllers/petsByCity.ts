import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { makeFindAllPetsByCityUseCase } from "../../use-cases/factories/make-find-all-pets-by-city-use-case"
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error"

export async function petsByCity (request: FastifyRequest, reply: FastifyReply) {
  const petsByCityBodySchema = z.object({
    city: z.string(),
    age: z.optional(z.string()),
    size_carry: z.optional(z.string()),
    energy_level: z.optional(z.string()),
    independence_level: z.optional(z.string()),
  })

  const {
    city,
    age,
    size_carry,
    energy_level,
    independence_level,
  } = petsByCityBodySchema.parse(request.query)

  try {
    const findAllPetsByCityUseCase = makeFindAllPetsByCityUseCase()

    const { pets } = await findAllPetsByCityUseCase.execute({
      city,
      age,
      size_carry,
      energy_level,
      independence_level,
    })

    return reply.status(200).send({pets})

  } catch (err) {
    if(err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    
    throw err
  }
}