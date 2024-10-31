
create database project_management;
use project_management;

create table `host`(
	id int primary key AUTO_INCREMENT,
    `name` varchar(45) not null,
    address varchar(45) not null
);

create table `contractor`(
	id int primary key AUTO_INCREMENT,
    `name` varchar(45) not null,
    address varchar(45) not null,
    contractorcol varchar(45) not null
);



create table building(
	id INT primary key  AUTO_INCREMENT,
    `name` VARCHAR(45) not null,
	address Varchar(45) not null,
    city Varchar(45) not null,
    cost FLOAT,
    start DATE,
    host_id INT not null,
    contractor_id INT not null,
    foreign key(host_id) references `host`(id),
    foreign key(contractor_id) references `contractor`(id)
);

CREATE TABLE architect (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    sex TINYINT(1),
    birthday DATE,
    place VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE worker (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
    birthday VARCHAR(45),
    year VARCHAR(45),
    skill VARCHAR(45)
);

CREATE TABLE design (
    building_id INT,
    architect_id INT,
    benefit VARCHAR(45),
    PRIMARY KEY (building_id, architect_id),
    FOREIGN KEY (building_id) REFERENCES building(id),
    FOREIGN KEY (architect_id) REFERENCES architect(id)
);

CREATE TABLE `work` (
    building_id INT,
    worker_id INT,
    date DATE,
    total VARCHAR(45),
    PRIMARY KEY (building_id, worker_id),
    FOREIGN KEY (building_id) REFERENCES building(id),
    FOREIGN KEY (worker_id) REFERENCES worker(id)
);