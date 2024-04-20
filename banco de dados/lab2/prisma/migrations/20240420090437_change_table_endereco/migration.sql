/*
  Warnings:

  - You are about to alter the column `cep` on the `Endereco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Endereco` MODIFY `cep` INTEGER NOT NULL;
