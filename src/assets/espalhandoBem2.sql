create database espalhandoBem;
use espalhandoBem;

CREATE TABLE `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  
  CREATE TABLE `users` (
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
   `favorite` TINYINT NULL DEFAULT 0,
    `user_favorited` int,
  PRIMARY KEY (`id`),
    FOREIGN KEY (`id_category`)
    REFERENCES `category` (`id`));

CREATE TABLE `posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(450) NOT NULL,
  `id_user` INT NOT NULL,
  `post_date` DATE NOT NULL,
  `deleted` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`)
  REFERENCES `users` (`id`)
);


CREATE TABLE `photos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(400) NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`)
  REFERENCES `users` (`id`)
);



INSERT INTO `category` (`id`, `name`) VALUES ('1', 'abrigo de cães');
INSERT INTO `category` (`id`, `name`) VALUES ('2', 'abrigo de idosos');
INSERT INTO `category` (`id`, `name`) VALUES ('3', 'ONG');
INSERT INTO `category` (`id`, `name`) VALUES ('4', 'Arrecadações de alimentos');
INSERT INTO `category` (`id`, `name`) VALUES ('5', 'Orfanato');

