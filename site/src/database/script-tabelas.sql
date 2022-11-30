-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database Projeto_Individual;
use Projeto_individual;

create table Skin(
idSkin int primary key auto_increment,
NomeSkin varchar(60)
);

create table Armamento(
idArmamento int primary key auto_increment,
NomeArmamento varchar(45),
fkSkin int
);



create table usuario(
idUsuario int primary key auto_increment,
Nome varchar(45) not null,
Email varchar(90) not null Unique, 
Senha varchar(256) not null,
constraint chkemail check (Email like '%@%'),
fkArmamento int, foreign key (fkArmamento) references Armamento(idArmamento)
);



Select * from armamento;
select * from skin;
select * from usuario;

select Armamento.*, count(fkArmamento) from usuario join armamento on idArmamento = fkArmamento;

insert into Skin values
(null, 'Case Hardened'),
(null, 'Howl'),
(null, 'Hyper Beast'),
(null, 'Akihabara Accept'),
(null, 'Dragon Lore'),
(null, 'Integrale');


insert into armamento values
(1, 'AK-47',1 ),
(2, 'M4A4',2),
(3, 'M4A1-S',3),
(4, 'AUG',4),
(5, 'AWP',5),
(6, 'SG553',6);



insert into usuario values
(null, 'Kaio', 'kaio@gmail.com', '1234', 1);


/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
