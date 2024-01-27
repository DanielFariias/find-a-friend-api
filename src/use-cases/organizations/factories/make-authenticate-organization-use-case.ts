import { PrismaOrganizationRepository } from '../../../repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate'

export function makeAuthenticateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const authenticateUseCase = new AuthenticateOrganizationUseCase(
    organizationRepository,
  )

  return authenticateUseCase
}
