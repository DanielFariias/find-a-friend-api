import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '../../../use-cases/pets/factories/make-create-pet-use-case'
import {
  PetAge,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
  PetType,
} from '@prisma/client'

const createBodySchema = z.object({
  name: z.string(),
  city: z.string(),
  age: z.nativeEnum(PetAge).optional(),
  type: z.nativeEnum(PetType).optional(),
  size: z.nativeEnum(PetSize).optional(),
  description: z.string().optional(),
  energyLevel: z.number().min(0).max(5).optional(),
  environment: z.nativeEnum(PetEnvironment).optional(),
  independenceLevel: z.nativeEnum(PetIndependenceLevel).optional(),
  adoptionRequirements: z.string().optional(),
})

export async function createPetRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    name,
    city,
    age,
    type,
    size,
    description,
    energyLevel,
    environment,
    independenceLevel,
    adoptionRequirements,
  } = createBodySchema.parse(request.body)

  const createUseCase = makeCreatePetUseCase()

  await createUseCase.execute({
    name,
    city,
    age,
    type,
    size,
    description,
    energyLevel,
    environment,
    independenceLevel,
    adoptionRequirements,
    organizationId: request.user.sub,
  })

  return reply.status(201).send()
}
