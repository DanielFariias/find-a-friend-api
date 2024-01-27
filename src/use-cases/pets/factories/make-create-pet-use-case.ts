import { PrismaOrganizationRepository } from '../../../repositories/prisma/prisma-organization-repository'
import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationRepository = new PrismaOrganizationRepository()
  const createUseCase = new CreatePetUseCase(
    petsRepository,
    organizationRepository,
  )

  return createUseCase
}
