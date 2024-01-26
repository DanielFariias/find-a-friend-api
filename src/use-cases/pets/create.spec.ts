import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to check in', async () => {
    const { pet } = await sut.execute({
      name: 'Any Pet Name',
      organizationId: 'any-organization-id',
    })

    console.log(pet)

    expect(pet.id).toEqual(expect.any(String))
  })
})
