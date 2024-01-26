-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('YOUNG', 'ADULT', 'OLD');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('CAT', 'DOG', 'OTHER');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('WIDE', 'MEDIUM', 'SMALL');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "adopted_at" TIMESTAMP(3),
    "adoptionRequirements" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "age" "PetAge" NOT NULL DEFAULT 'YOUNG',
    "energyLevel" INTEGER NOT NULL DEFAULT 3,
    "size" "PetSize" NOT NULL DEFAULT 'MEDIUM',
    "independenceLevel" "IndependenceLevel" NOT NULL DEFAULT 'MEDIUM',
    "type" "PetType" NOT NULL DEFAULT 'OTHER',
    "enviroment" "PetEnvironment" NOT NULL DEFAULT 'MEDIUM',
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
