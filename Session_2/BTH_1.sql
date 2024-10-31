create database  ECommerceDB;
use ECommerceDB;

create table Users(
	ID INT primary key auto_increment,
    username VARCHAR(50) unique not null,
    passwordHash VARCHAR(255) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL
);

create table Products(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	productName VARCHAR(100) NOT NULL,
	`description` TEXT,
	price DECIMAL(10, 2) NOT NULL,
	stock INT NOT NULL
);

create table Cart(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	userID INT,
	total INT NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(id)
);

create table CartItems(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	cartID INT,
	productID INT,
	quantity INT NOT NULL,
    FOREIGN KEY(cartID) REFERENCES Products(id),
	FOREIGN KEY(productID) REFERENCES Products(id)
)


