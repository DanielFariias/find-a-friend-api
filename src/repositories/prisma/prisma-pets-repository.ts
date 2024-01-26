import { Prisma } from '@prisma/client'
import { IPetsRepository } from '../pets-repository'
import { prisma } from '../../lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
