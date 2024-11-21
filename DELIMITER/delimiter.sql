CREATE DATABASE SalesDB;
use SalesDB;

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Price DECIMAL(10, 2)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Promotions (
    PromotionID INT PRIMARY KEY,
    PromotionName VARCHAR(100),
    DiscountPercentage DECIMAL(5, 2)
);

CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    OrderID INT,
    SaleDate DATE,
    SaleAmount DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);






DELIMITER $$

CREATE PROCEDURE CalculateMonthlyRevenueAndApplyPromotion(
    IN monthYear VARCHAR(100),
    IN revenueThreshold DECIMAL(10, 2)
)
BEGIN

    INSERT INTO Promotions (PromotionID, PromotionName, DiscountPercentage)
    SELECT 
        CONCAT('Promo for Customer ', CustomerID, ' in ', monthYear),
        10.00
    FROM (
        SELECT CustomerID, SUM(TotalAmount) AS TotalRevenue
        FROM Orders
        WHERE DATE_FORMAT(OrderDate, '%Y-%m') = monthYear
        GROUP BY CustomerID
        HAVING TotalRevenue > revenueThreshold
    );
END$$
DELIMITER ;


SELECT * FROM customers;