import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use'
import { compare } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

const NewOrganization = {
  title: 'Little Pets',
  email: 'pets@pets.com',
  responsibleName: 'João',
  address: 'Rua dos Pets',
  postalCode: '12345678',
  password: '123456',
  phone: '123456789',
}

describe('Create Organization Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a organization', async () => {
    const { organization } = await sut.execute(NewOrganization)

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'pets@pets.com',
        title: 'Little Pets',
        responsible_name: 'João',
        address: 'Rua dos Pets',
        postalCode: '12345678',
        phone: '123456789',
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      }),
    )
  })

  it('should not be able to create two organizations with the same email', async () => {
    const email = 'pets@pets.com'
    await sut.execute(NewOrganization)

    await expect(() =>
      sut.execute({
        title: 'Petinhos 2',
        email,
        responsibleName: 'João 2',
        address: 'Rua dos Pets 2',
        postalCode: '12345672',
        password: '12345622',
        phone: '123456782',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError)
  })

  it('should hash organization password upon registration', async () => {
    const password = '123456'
    const { organization } = await sut.execute({ ...NewOrganization, password })

    const isPasswordCorrectlyHashed = await compare(
      password,
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
