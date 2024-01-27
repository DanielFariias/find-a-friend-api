import {
  PetAge,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
  PetType,
} from '@prisma/client'
import { IPetsRepository } from '../../repositories/pets-repository'
import { ResourceIsRequired } from '../errors/resource-is-required'

interface ListPetsUseCaseRequest {
  city: string
  age?: PetAge
  type?: PetType
  size?: PetSize
  energyLevel?: number
  environment?: PetEnvironment
  independenceLevel?: PetIndependenceLevel
}

export class ListPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    type,
    size,
    energyLevel,
    environment,
    independenceLevel,
  }: ListPetsUseCaseRequest) {
    if (!city) throw new ResourceIsRequired('City')

    const pets = await this.petsRepository.findByCity(city)

    const filteredPets = pets.filter((pet) => {
      if (age && pet.age !== age) return false
      if (type && pet.type !== type) return false
      if (size && pet.size !== size) return false
      if (energyLevel && pet.energy_level !== energyLevel) return false
      if (environment && pet.environment !== environment) return false
      if (independenceLevel && pet.independence_level !== independenceLevel)
        return false

      return true
    })

    const canAdopt = filteredPets.filter((pet) => pet.adopted_at === null)

    return { pets: canAdopt }
  }
}
