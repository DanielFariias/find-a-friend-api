import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { hash } from 'bcryptjs'
import { prisma } from '../../../lib/prisma'

describe('Get One Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const org = await prisma.organization.create({
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

    const pet = await prisma.pet.create({
      data: {
        name: 'Gatinho',
        city: 'Fortaleza',
        organization_id: org.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Gatinho',
      }),
    )
  })
})
