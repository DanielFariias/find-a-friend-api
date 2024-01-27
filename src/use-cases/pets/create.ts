import {
  PetAge,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
  PetType,
} from '@prisma/client'
import { IPetsRepository } from '../../repositories/pets-repository'
import { IOrganizationsRepository } from '../../repositories/organizations-repository'
import { ResourceNotFoundError } from '../errors/resource.not-found'
import { ResourceIsRequired } from '../errors/resource-is-required'

interface CreatePetUseCaseRequest {
  name: string
  city: string
  organizationId: string
  age?: PetAge
  type?: PetType
  size?: PetSize
  description?: string
  energyLevel?: number
  environment?: PetEnvironment
  independenceLevel?: PetIndependenceLevel
  adoptedAt?: Date
  adoptionRequirements?: string
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute({
    name,
    city,
    organizationId,
    age,
    type,
    size,
    description,
    energyLevel,
    environment,
    independenceLevel,
    adoptedAt,
    adoptionRequirements,
  }: CreatePetUseCaseRequest) {
    if (!city) throw new ResourceIsRequired('City')
    if (!name) throw new ResourceIsRequired('Name')
    if (!organizationId) throw new ResourceIsRequired('Organization Id')

    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) throw new ResourceNotFoundError()

    const pet = await this.petsRepository.create({
      name,
      organization_id: organizationId,
      city,
      age,
      type,
      size,
      description,
      environment,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      adopted_at: adoptedAt,
      adoption_requirements: adoptionRequirements,
    })

    return { pet }
  }
}
