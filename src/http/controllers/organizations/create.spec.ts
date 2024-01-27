import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '../../../app'

describe('Create Organization Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a organization', async () => {
    const createResponse = await request(app.server)
      .post('/organizations')
      .send({
        title: 'Petinhos 2',
        email: 'petinhos@pets.com.br',
        responsibleName: 'João 2',
        address: 'Rua dos Pets 2',
        postalCode: '12345672',
        password: '12345622',
        phone: '123456782',
      })
    expect(createResponse.statusCode).toEqual(201)
  })
})
