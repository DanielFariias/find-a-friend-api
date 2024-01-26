import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      adopted_at: null,
      adoption_requirements: data.adoption_requirements
        ? data.adoption_requirements
        : null,
      age: data.age ? data.age : null,
      description: data.description ? data.description : null,
      energy_level: data.energy_level ? data.energy_level : null,
      environment: data.environment ? data.environment : null,
      independence_level: data.independence_level
        ? data.independence_level
        : null,
      name: data.name,
      size: data.size ? data.size : null,
      type: data.type ? data.type : null,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
