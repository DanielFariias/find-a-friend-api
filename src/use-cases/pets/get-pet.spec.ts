import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource.not-found'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)

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
  })

  it('should be able to get pet details', async () => {
    const newPet = await petsRepository.create({
      name: 'Any Pet Name',
      organization_id: 'any-organization-id',
      city: 'Fortaleza',
      age: 'ADULT',
      energy_level: 2,
    })

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet.name).toEqual('Any Pet Name')
    expect(pet.organization_id).toEqual('any-organization-id')
    expect(pet.city).toEqual('Fortaleza')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
