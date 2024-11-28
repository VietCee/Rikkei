create database InventoryManagement;
use InventoryManagement ;

CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY, 
    ProductName VARCHAR(100),
    Quantity INT
);

CREATE TABLE InventoryChanges (
    ChangeID INT AUTO_INCREMENT PRIMARY KEY, 
    ProductID INT,
    OldQuantity INT,
    NewQuantity INT,
    ChangeDate DATETIME,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

select * from Products;

DELIMITER $$
CREATE TRIGGER AfterProductUpdate
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
    INSERT INTO InventoryChanges (ProductID, OldQuantity, NewQuantity, ChangeDate)
    VALUES (OLD.ProductID, OLD.Quantity, NEW.Quantity, NOW());
END$$
DELIMITER $$;

UPDATE Products
SET Quantity = 20
WHERE ProductID = 2;

SELECT * FROM InventoryChanges;

-- 2
DELIMITER $$
CREATE TRIGGER BeforeProductDelete
BEFORE DELETE ON Products
FOR EACH ROW
BEGIN
    IF OLD.Quantity > 10 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Khong the xoa: so luong lon hon 10';
    END IF;
END$$
DELIMITER $$;
-- 3
ALTER TABLE Products
ADD COLUMN LastUpdated DATETIME;

DELIMITER $$

CREATE TRIGGER AfterProductUpdateSetDate
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
    UPDATE Products
    SET LastUpdated = NOW()
    WHERE ProductID = NEW.ProductID;
END$$

DELIMITER $$;

-- 4 
CREATE TABLE ProductSummary (
    SummaryID INT PRIMARY KEY AUTO_INCREMENT,
    TotalQuantity INT DEFAULT 0
);

INSERT INTO ProductSummary (TotalQuantity)
VALUES (0);

DELIMITER $$

CREATE TRIGGER AfterProductUpdateSummary
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
    UPDATE ProductSummary
    SET TotalQuantity = (SELECT SUM(Quantity) FROM Products)
    WHERE SummaryID = 1;
END$$

DELIMITER $$;

UPDATE Products
SET Quantity = 50
WHERE ProductID = 1;

-- 5
CREATE TABLE InventoryChangeHistory (
	historyID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    oldQuantity INT,
    newQuantity INT,
    changeType ENUM('Increase', 'Decrease'),
    changeDate DATETIME,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

DELIMITER $$
CREATE TRIGGER AfterProductUpdateHistory  
AFTER UPDATE 
ON Products
FOR EACH ROW
BEGIN
	 DECLARE changeType VARCHAR(50);
     
    IF NEW.Quantity > OLD.Quantity THEN
        SET changeType = 'Increase';
        
    ELSEIF NEW.Quantity < OLD.Quantity THEN
        SET changeType = 'Decrease';
    ELSE
        SET changeType = NULL;
    END IF;	
    
    IF NEW.Quantity != OLD.Quantity THEN
		INSERT INTO InventoryChangeHistory (ProductID, oldQuantity, newQuantity, changeType, changeDate)
		VALUES (NEW.ProductID, OLD.Quantity, NEW.Quantity, changeType, NOW()); 
     END IF;
     
END $$
DELIMITER ;

UPDATE Products
SET Quantity = 10
WHERE ProductID = 2;

-- 6
CREATE TABLE ProductRestock (
	RestockID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    RestockQuantity INT DEFAULT 0,
    RestockDate DATETIME,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

DELIMITER $$
CREATE TRIGGER AfterProductUpdateRestock 
AFTER UPDATE
ON Products
FOR EACH ROW
BEGIN
	IF NEW.Quantity < 10 AND OLD.Quantity >= 10 THEN
		INSERT INTO ProductRestock (ProductID, RestockQuantity, RestockDate)
        VALUES (NEW.ProductID, 1, NOW());
	END IF;
END $$
DELIMITER ;

UPDATE Products
SET Quantity = 20
WHERE ProductID = 1;

