import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IOrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements IOrganizationsRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      title: data.title,
      email: data.email,
      address: data.address,
      postalCode: data.postalCode,
      password_hash: data.password_hash,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
