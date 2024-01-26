import { IOrganizationsRepository } from '../../repositories/organizations-repository'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use'
import { hash } from 'bcryptjs'

interface ICreateOrganizationUseCaseRequest {
  responsibleName: string
  title: string
  email: string
  postalCode: string
  address: string
  phone: string
  password: string
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    title,
    email,
    responsibleName,
    address,
    postalCode,
    phone,
    password,
  }: ICreateOrganizationUseCaseRequest) {
    const orgWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailAlreadyInUseError()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      title,
      email,
      responsible_name: responsibleName,
      address,
      postalCode,
      phone,
      password_hash: passwordHash,
    })

    return { organization }
  }
}
