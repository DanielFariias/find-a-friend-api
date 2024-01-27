import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { OrganizationRoutes } from './http/controllers/organizations/routes'

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(OrganizationRoutes)

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
