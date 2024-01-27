import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  PetAge,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
  PetType,
} from '@prisma/client'
import { makeListPetsPetUseCase } from '../../../use-cases/pets/factories/make-list-pets-use-case'

const searchQuerySchema = z.object({
  city: z.string(),
  age: z.nativeEnum(PetAge).optional(),
  type: z.nativeEnum(PetType).optional(),
  size: z.nativeEnum(PetSize).optional(),
  energyLevel: z.number().min(0).max(5).optional(),
  environment: z.nativeEnum(PetEnvironment).optional(),
  independenceLevel: z.nativeEnum(PetIndependenceLevel).optional(),
})

export async function listPetsRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { city, age, type, size, energyLevel, environment, independenceLevel } =
    searchQuerySchema.parse(request.query)

  const listPetsUseCase = makeListPetsPetUseCase()

  const { pets } = await listPetsUseCase.execute({
    city,
    age,
    type,
    size,
    energyLevel,
    environment,
    independenceLevel,
  })

  return reply.status(200).send({ pets })
}
