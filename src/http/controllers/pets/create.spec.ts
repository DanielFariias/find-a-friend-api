import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '../../../app'
import { prisma } from '../../../lib/prisma'
import { hash } from 'bcryptjs'

describe('Create Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a pet', async () => {
    await prisma.organization.create({
      data: {
        title: 'Petinhos 2',
        email: 'petinhos@pets.com.br',
        responsible_name: 'João 2',
        address: 'Rua dos Pets 2',
        postalCode: '12345672',
        password_hash: await hash('12345622', 6),
        phone: '123456782',
      },
    })

    const {
      body: { token },
    } = await request(app.server).post('/sessions').send({
      email: 'petinhos@pets.com.br',
      password: '12345622',
    })

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Any Pet Name',
        city: 'Any City',
      })

    expect(response.status).toBe(201)
  })
})
