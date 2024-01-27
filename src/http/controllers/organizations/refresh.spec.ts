import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/organizations').send({
      title: 'Petinhos 2',
      email: 'petinhos@pets.com.br',
      responsibleName: 'João 2',
      address: 'Rua dos Pets 2',
      postalCode: '12345672',
      password: '12345622',
      phone: '123456782',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'petinhos@pets.com.br',
      password: '12345622',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
