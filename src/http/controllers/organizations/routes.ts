import { FastifyInstance } from 'fastify'
import { authenticateOrganizationRoute } from './authenticate'
import { createOrganizationRoute } from './create'
import { refreshOrganizationRoute } from './refresh'

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateOrganizationRoute)
  app.post('/organizations', createOrganizationRoute)

  app.patch('/token/refresh', refreshOrganizationRoute)
}
