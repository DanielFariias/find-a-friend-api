import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository'
import { ListPetsUseCase } from '../list-pets'

export function makeListPetsPetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const listPetsUseCase = new ListPetsUseCase(petsRepository)

  return listPetsUseCase
}
