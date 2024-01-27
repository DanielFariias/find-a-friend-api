import { PrismaOrganizationRepository } from '../../../repositories/prisma/prisma-organization-repository'
import { CreateOrganizationUseCase } from '../create'

export function makeCreateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const createUseCase = new CreateOrganizationUseCase(organizationRepository)

  return createUseCase
}
