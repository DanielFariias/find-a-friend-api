import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '../../repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateOrganizationUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

let authenticateRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    authenticateRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(authenticateRepository)
  })

  it('should be able to authenticate', async () => {
    await authenticateRepository.create({
      title: 'Little Pets',
      email: 'pets@pets.com',
      responsible_name: 'João',
      address: 'Rua dos Pets',
      postalCode: '12345678',
      password_hash: await hash('12345678', 6),
      phone: '123456789',
    })

    const { organization } = await sut.execute({
      email: 'pets@pets.com',
      password: '12345678',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await authenticateRepository.create({
      title: 'Little Pets',
      email: 'pets@pets.com',
      responsible_name: 'João',
      address: 'Rua dos Pets',
      postalCode: '12345678',
      password_hash: await hash('12345678', 6),
      phone: '123456789',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
