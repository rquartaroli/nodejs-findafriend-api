import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetOrganizationUseCase } from "../../use-cases/factories/make-get-organization-use-case"

export async function organizationLogin(request: FastifyRequest, reply: FastifyReply) {
  const getOrganization = makeGetOrganizationUseCase()

  const { organization } = await getOrganization.execute({
    organizationId: request.user.sub,
  })

  return reply.status(200).send({
    organization: {
      ...organization,
      password_hash: undefined,
    },
  })
}