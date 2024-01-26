import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
