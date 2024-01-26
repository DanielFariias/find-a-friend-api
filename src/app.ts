import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.get('/', async () => {
  return { hello: 'world' }
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
