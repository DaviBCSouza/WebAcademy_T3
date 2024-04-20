/*
  Warnings:

  - You are about to alter the column `desconto` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Double`.
  - You are about to alter the column `preco` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Compra` MODIFY `desconto` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Produto` MODIFY `preco` DOUBLE NOT NULL;
