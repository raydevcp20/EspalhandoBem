create database espalhandoBem;
use espalhandoBem;

CREATE TABLE `espalhandobem`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  
  CREATE TABLE `espalhandobem`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type_NID` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `description` VARCHAR(450) NULL,
  `id_category` INT NULL,
  `cep` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `cnpj` VARCHAR(45) NULL,
  `cpf` VARCHAR(45) NULL,
  `telephone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`id_category`)
    REFERENCES `espalhandobem`.`category` (`id`));
    
CREATE TABLE `espalhandobem`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(450) NOT NULL,
  `id_user` INT NOT NULL,
  `post_date` DATE NOT NULL,
  `deleted` TINYINT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`)
  REFERENCES `espalhandobem`.`users` (`id`)
);


CREATE TABLE `espalhandobem`.`photos` (
  `id` INT NOT NULL,
  `link` VARCHAR(400) NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`)
  REFERENCES `espalhandobem`.`users` (`id`)
);



INSERT INTO `espalhandobem`.`category` (`id`, `name`) VALUES ('1', 'abrigo de cães');
INSERT INTO `espalhandobem`.`category` (`id`, `name`) VALUES ('2', 'abrigo de idosos');

