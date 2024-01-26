import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { makeCreatePetUseCase } from './use-cases/pets/factories/make-create-pet-use-case'

export const app = fastify()

app.get('/', async () => {
  return { hello: 'world' }
})

app.post('/pets', async (request, reply) => {
  const createUseCase = makeCreatePetUseCase()

  const { pet } = await createUseCase.execute({
    name: 'Doug',
    organizationId: '80bab3b3-4060-4a2c-876d-c272b99ce22d',
  })

  return reply.status(201).send({ pet })
})

// Routes

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external service like Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
