import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrganizationUseCase } from '../../../use-cases/organizations/factories/make-create-organization-use-case'
import { EmailAlreadyInUseError } from '../../../use-cases/errors/email-already-in-use'

const createBodySchema = z.object({
  responsibleName: z.string(),
  title: z.string(),
  email: z.string().email(),
  postalCode: z.string(),
  address: z.string(),
  phone: z.string(),
  password: z.string(),
})

export async function createOrganizationRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    title,
    responsibleName,
    email,
    password,
    phone,
    address,
    postalCode,
  } = createBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    await createOrganizationUseCase.execute({
      title,
      responsibleName,
      email,
      password,
      phone,
      address,
      postalCode,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyInUseError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
