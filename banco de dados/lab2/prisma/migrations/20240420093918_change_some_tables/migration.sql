/*
  Warnings:

  - A unique constraint covering the columns `[produto_modelo_num_serie_id]` on the table `Compra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[modelo_id]` on the table `NumSerie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Compra_produto_modelo_num_serie_id_key` ON `Compra`(`produto_modelo_num_serie_id`);

-- CreateIndex
CREATE UNIQUE INDEX `NumSerie_modelo_id_key` ON `NumSerie`(`modelo_id`);
