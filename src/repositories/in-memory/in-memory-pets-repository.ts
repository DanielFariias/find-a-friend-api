import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      organization_id: data.organization_id,
      city: data.city,

      age: data.age ? data.age : null,
      size: data.size ? data.size : null,
      type: data.type ? data.type : null,

      description: data.description ? data.description : null,
      energy_level: data.energy_level ? data.energy_level : null,
      environment: data.environment ? data.environment : null,
      independence_level: data.independence_level
        ? data.independence_level
        : null,

      adopted_at: null,
      adoption_requirements: data.adoption_requirements
        ? data.adoption_requirements
        : null,

      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
