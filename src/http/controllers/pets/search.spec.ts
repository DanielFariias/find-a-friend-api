import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { hash } from 'bcryptjs'
import { prisma } from '../../../lib/prisma'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Any Pet Name',
        city: 'Fortaleza',
        age: 'ADULT',
        energy_level: 2,
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Any Pet Name',
        city: 'Fortaleza',
        size: 'SMALL',
        type: 'DOG',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Any Pet Name',
        city: 'Fortaleza',
        environment: 'MEDIUM',
        independence_level: 'HIGH',
      })

    const responseByCity = await request(app.server)
      .get('/pets')
      .query({
        city: 'Fortaleza',
      })
      .send()

    expect(responseByCity.statusCode).toEqual(200)
    expect(responseByCity.body.pets).toHaveLength(3)

    const responseByAgeAndEnergyLevel = await request(app.server)
      .get('/pets')
      .query({
        city: 'Fortaleza',
        age: 'ADULT',
        energy_level: 2,
      })
      .send()

    expect(responseByAgeAndEnergyLevel.statusCode).toEqual(200)
    expect(responseByAgeAndEnergyLevel.body.pets).toHaveLength(1)
    expect(responseByAgeAndEnergyLevel.body.pets).toEqual([
      expect.objectContaining({
        name: 'Any Pet Name',
      }),
    ])
  })
})
