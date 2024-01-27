import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '../../../app'

describe('Authenticate Organization Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to authenticate', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'petinhos@pets.com.br',
      password: '12345622',
    })

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
