-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('YOUNG', 'ADULT', 'OLD');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetIndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

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
    "adoption_requirements" TEXT DEFAULT '',
    "age" "PetAge" DEFAULT 'YOUNG',
    "energy_level" INTEGER DEFAULT 3,
    "size" "PetSize" DEFAULT 'MEDIUM',
    "independence_level" "PetIndependenceLevel" DEFAULT 'MEDIUM',
    "type" "PetType" DEFAULT 'OTHER',
    "environment" "PetEnvironment" DEFAULT 'MEDIUM',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
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
