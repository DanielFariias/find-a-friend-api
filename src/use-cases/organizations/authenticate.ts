import { Organization } from '@prisma/client'
import { IOrganizationsRepository } from '../../repositories/organizations-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

interface IAuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateOrganizationUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateOrganizationUseCaseRequest): Promise<IAuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
