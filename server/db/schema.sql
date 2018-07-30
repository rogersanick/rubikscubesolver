DROP DATABASE IF EXISTS ethercubes;

CREATE DATABASE ethercubes;

USE ethercubes;

CREATE TABLE CUBES (
  id int NOT null AUTO_INCREMENT,
  userid int not null,
  pass VARCHAR(200) NOT null,
  solution VARCHAR(200) NOT null,
  cube_state VARCHAR(200) NOT NULL,
  ether_contract_id VARCHAR(200) NOT NULL,
  primary key (id)
);
