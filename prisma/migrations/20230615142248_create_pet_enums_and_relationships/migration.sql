-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Filhote', 'Adolescente', 'Idoso');

-- CreateEnum
CREATE TYPE "SizeCarry" AS ENUM ('Pequenino', 'Medio', 'Grande');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('Baixa', 'Pouca', 'Consideravel', 'Muita', 'Elevada');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('Baixo', 'Mediano', 'Alto');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('reduzido', 'medio', 'amplo');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size_carry" "SizeCarry" NOT NULL,
    "energy_level" "EnergyLevel" NOT NULL,
    "independence_level" "IndependenceLevel" NOT NULL,
    "environment" "Environment" NOT NULL,
    "photos" TEXT NOT NULL,
    "requirements_adoption" TEXT[],
    "organization_Id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_Id_fkey" FOREIGN KEY ("organization_Id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
