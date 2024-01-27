import { FastifyInstance } from 'fastify'
import { createPetRoute } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { listPetsRoute } from './search'
import { getOneRoute } from './get-one'

export async function PetsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, createPetRoute)

  app.get('/pets', listPetsRoute)
  app.get('/pets/:id', getOneRoute)
}
