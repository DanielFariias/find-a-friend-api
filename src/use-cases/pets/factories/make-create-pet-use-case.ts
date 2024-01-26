import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createUseCase = new CreatePetUseCase(petsRepository)

  return createUseCase
}
