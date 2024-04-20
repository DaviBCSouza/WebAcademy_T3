-- CreateTable
CREATE TABLE `Cliente` (
    `cpf` VARCHAR(11) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `celular` VARCHAR(15) NOT NULL,
    `email` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_cpf` VARCHAR(11) NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `numero` INTEGER NOT NULL,
    `cep` INTEGER NOT NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `estado` VARCHAR(45) NOT NULL,
    `pais` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria_id` INTEGER NOT NULL,
    `modelo_id` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `fabricante` VARCHAR(45) NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `estoque` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Modelo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto_id` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumSerie` (
    `codigo` VARCHAR(100) NOT NULL,
    `modelo_id` INTEGER NOT NULL,

    UNIQUE INDEX `NumSerie_modelo_id_key`(`modelo_id`),
    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdutoModeloNumSerie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto_id` INTEGER NOT NULL,
    `modelo_id` INTEGER NOT NULL,
    `num_serie_cod` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_cpf` VARCHAR(11) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `desconto` DECIMAL(5, 2) NULL,
    `forma_pagamento` VARCHAR(45) NOT NULL,
    `endereco_id` INTEGER NOT NULL,
    `produto_modelo_num_serie_id` INTEGER NOT NULL,

    UNIQUE INDEX `Compra_produto_modelo_num_serie_id_key`(`produto_modelo_num_serie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria_id` INTEGER NOT NULL,
    `nome` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_cliente_cpf_fkey` FOREIGN KEY (`cliente_cpf`) REFERENCES `Cliente`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Modelo` ADD CONSTRAINT `Modelo_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumSerie` ADD CONSTRAINT `NumSerie_modelo_id_fkey` FOREIGN KEY (`modelo_id`) REFERENCES `Modelo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoModeloNumSerie` ADD CONSTRAINT `ProdutoModeloNumSerie_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoModeloNumSerie` ADD CONSTRAINT `ProdutoModeloNumSerie_modelo_id_fkey` FOREIGN KEY (`modelo_id`) REFERENCES `Modelo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdutoModeloNumSerie` ADD CONSTRAINT `ProdutoModeloNumSerie_num_serie_cod_fkey` FOREIGN KEY (`num_serie_cod`) REFERENCES `NumSerie`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_cliente_cpf_fkey` FOREIGN KEY (`cliente_cpf`) REFERENCES `Cliente`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_endereco_id_fkey` FOREIGN KEY (`endereco_id`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_produto_modelo_num_serie_id_fkey` FOREIGN KEY (`produto_modelo_num_serie_id`) REFERENCES `ProdutoModeloNumSerie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
