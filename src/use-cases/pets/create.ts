import {
  PetAge,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
  PetType,
} from '@prisma/client'
import { IPetsRepository } from '../../repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  organizationId: string
  description?: string
  adoptionRequirements?: string
  age?: PetAge
  energyLevel?: number
  size?: PetSize
  independenceLevel?: PetIndependenceLevel
  type?: PetType
  environment?: PetEnvironment
  adoptedAt?: Date
}

export class CreatePetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    adoptionRequirements,
    age,
    description,
    energyLevel,
    environment,
    independenceLevel,
    name,
    size,
    type,
    organizationId,
    adoptedAt,
  }: CreatePetUseCaseRequest) {
    const pet = await this.petsRepository.create({
      name,
      organization_id: organizationId,
      adopted_at: adoptedAt,
      adoption_requirements: adoptionRequirements,
      age,
      description,
      energy_level: energyLevel,
      environment,
      independence_level: independenceLevel,
      size,
      type,
    })

    return { pet }
  }
}
