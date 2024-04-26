/*
  Warnings:

  - You are about to drop the `itens_compra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itens_compra` DROP FOREIGN KEY `itens_compra_compraId_fkey`;

-- DropForeignKey
ALTER TABLE `itens_compra` DROP FOREIGN KEY `itens_compra_produtoId_fkey`;

-- DropTable
DROP TABLE `itens_compra`;

-- CreateTable
CREATE TABLE `compra_itens` (
    `id` CHAR(40) NOT NULL,
    `compraId` CHAR(40) NOT NULL,
    `produtoId` CHAR(40) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compra_itens` ADD CONSTRAINT `compra_itens_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `compras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra_itens` ADD CONSTRAINT `compra_itens_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
