import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '../../../use-cases/pets/factories/make-get-pet-use-case'

const searchParamsSchema = z.object({
  id: z.string(),
})

export async function getOneRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = searchParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({ petId: id })

  return reply.status(200).send({ pet })
}
