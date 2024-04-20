-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema loja_online
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema loja_online
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `loja_online` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `loja_online` ;

-- -----------------------------------------------------
-- Table `loja_online`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`cliente` (
  `cpf` VARCHAR(11) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `celular` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_cpf` VARCHAR(11) NOT NULL,
  `rua` VARCHAR(100) NOT NULL,
  `numero` VARCHAR(8) NOT NULL,
  `cep` INT NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_endereco_cliente_idx` (`cliente_cpf` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_cliente`
    FOREIGN KEY (`cliente_cpf`)
    REFERENCES `loja_online`.`cliente` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`produto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `fabricante` VARCHAR(45) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `estoque` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produto_categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_produto_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `loja_online`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`modelo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`modelo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_modelo_produto1_idx` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `fk_modelo_produto1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `loja_online`.`produto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`num_serie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`num_serie` (
  `codigo` VARCHAR(100) NOT NULL,
  `modelo_id` INT NOT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `fk_num_serie_modelo1_idx` (`modelo_id` ASC) VISIBLE,
  CONSTRAINT `fk_num_serie_modelo1`
    FOREIGN KEY (`modelo_id`)
    REFERENCES `loja_online`.`modelo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`produto_modelo_num_serie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`produto_modelo_num_serie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `modelo_id` INT NOT NULL,
  `num_serie_codigo` INT NOT NULL,
  INDEX `fk_produto_modelo_num_serie_produto1_idx` (`produto_id` ASC) VISIBLE,
  INDEX `fk_produto_modelo_num_serie_modelo1_idx` (`modelo_id` ASC) VISIBLE,
  INDEX `fk_produto_modelo_num_serie_num_serie1_idx` (`num_serie_codigo` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_produto_modelo_num_serie_produto1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `loja_online`.`produto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produto_modelo_num_serie_modelo1`
    FOREIGN KEY (`modelo_id`)
    REFERENCES `loja_online`.`modelo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produto_modelo_num_serie_num_serie1`
    FOREIGN KEY (`num_serie_codigo`)
    REFERENCES `loja_online`.`num_serie` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`compra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_cpf` VARCHAR(11) NOT NULL,
  `data_hora` DATETIME NOT NULL DEFAULT current_timestamp,
  `desconto` DECIMAL(5,2) NULL,
  `forma_pagamento` VARCHAR(45) NOT NULL,
  `endereco_id` INT NOT NULL,
  `produto_modelo_num_serie_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_compra_endereco1_idx` (`endereco_id` ASC) VISIBLE,
  INDEX `fk_compra_cliente1_idx` (`cliente_cpf` ASC) VISIBLE,
  INDEX `fk_compra_produto_modelo_num_serie1_idx` (`produto_modelo_num_serie_id` ASC) VISIBLE,
  CONSTRAINT `fk_compra_endereco1`
    FOREIGN KEY (`endereco_id`)
    REFERENCES `loja_online`.`endereco` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_cliente1`
    FOREIGN KEY (`cliente_cpf`)
    REFERENCES `loja_online`.`cliente` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_produto_modelo_num_serie1`
    FOREIGN KEY (`produto_modelo_num_serie_id`)
    REFERENCES `loja_online`.`produto_modelo_num_serie` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `loja_online`.`subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_online`.`subcategoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `nome` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_subcategoria_categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_subcategoria_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `loja_online`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
