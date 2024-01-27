import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { ListPetsUseCase } from './list-pets'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let sut: ListPetsUseCase

describe('List Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetsUseCase(petsRepository)

    const organizationRepository = new InMemoryOrganizationsRepository()

    await organizationRepository.create({
      id: 'any-organization-id',
      title: 'Little Pets',
      email: 'pets@pets.com',
      responsible_name: 'João',
      address: 'Rua dos Pets',
      postalCode: '12345678',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    })

    for (let i = 0; i <= 3; i++) {
      await petsRepository.create({
        name: 'Any Pet Name',
        organization_id: 'any-organization-id',
        city: 'Fortaleza',
        age: 'ADULT',
        energy_level: 2,
      })
    }

    for (let i = 0; i <= 3; i++) {
      await petsRepository.create({
        name: 'Any Pet Name',
        organization_id: 'any-organization-id',
        city: 'Fortaleza',
        size: 'SMALL',
        type: 'DOG',
      })
    }

    for (let i = 0; i <= 3; i++) {
      await petsRepository.create({
        name: 'Any Pet Name',
        organization_id: 'any-organization-id',
        city: 'Fortaleza',
        environment: 'MEDIUM',
        independence_level: 'HIGH',
      })
    }
  })

  it('should be able to list pets with a city', async () => {
    const { pets } = await sut.execute({
      city: 'Fortaleza',
    })

    expect(pets.length).toBe(12)
  })

  it('should be able to list pets with a city and other characteristics', async () => {
    const { pets: petsWithAgeAndEnergyLevel } = await sut.execute({
      city: 'Fortaleza',
      age: 'ADULT',
      energyLevel: 2,
    })

    expect(petsWithAgeAndEnergyLevel.length).toBe(4)

    const { pets: petsWithSizeAndType } = await sut.execute({
      city: 'Fortaleza',
      size: 'SMALL',
      type: 'DOG',
    })

    expect(petsWithSizeAndType.length).toBe(4)

    const { pets: petsWithEnvironmentAndIndependenceLevel } = await sut.execute(
      {
        city: 'Fortaleza',
        environment: 'MEDIUM',
        independenceLevel: 'HIGH',
      },
    )

    expect(petsWithEnvironmentAndIndependenceLevel.length).toBe(4)
  })
})
