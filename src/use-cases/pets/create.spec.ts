import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { OrganizationNotFoundError } from '../errors/organization.not-found'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new CreatePetUseCase(petsRepository, organizationRepository)

    const NewOrganization = {
      id: 'any-organization-id',
      title: 'Little Pets',
      email: 'pets@pets.com',
      responsible_name: 'João',
      address: 'Rua dos Pets',
      postalCode: '12345678',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    }

    await organizationRepository.create(NewOrganization)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Any Pet Name',
      organizationId: 'any-organization-id',
      city: 'Any City',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it("should not be able to create a pet if can't find an organization", async () => {
    await expect(() =>
      sut.execute({
        name: 'Any Pet Name',
        organizationId: 'any-organization-id-2',
        city: 'Any City',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
