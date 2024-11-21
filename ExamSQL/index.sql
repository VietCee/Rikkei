-- Excercise 2

ALTER TABLE products
ADD CONSTRAINT fk_products_categories
FOREIGN KEY (categoryId) REFERENCES categories(categoryId);

ALTER TABLE products
ADD CONSTRAINT fk_products_stores
FOREIGN KEY (storeId) REFERENCES stores(storeId);

ALTER TABLE orders
ADD CONSTRAINT fk_orders_users
FOREIGN KEY (userId) REFERENCES users(userId);

ALTER TABLE orders
ADD CONSTRAINT fk_orders_stores
FOREIGN KEY (storeId) REFERENCES stores(storeId);

ALTER TABLE order_details
ADD CONSTRAINT fk_order_details_orders
FOREIGN KEY (orderId) REFERENCES orders(orderId);

ALTER TABLE order_details
ADD CONSTRAINT fk_order_details_products
FOREIGN KEY (productId) REFERENCES products(productId);

ALTER TABLE carts
ADD CONSTRAINT fk_carts_users
FOREIGN KEY (userId) REFERENCES users(userId);

ALTER TABLE carts
ADD CONSTRAINT fk_carts_products
FOREIGN KEY (productId) REFERENCES products(productId);

ALTER TABLE reviews
ADD CONSTRAINT fk_reviews_users
FOREIGN KEY (userId) REFERENCES users(userId);

ALTER TABLE reviews
ADD CONSTRAINT fk_reviews_products
FOREIGN KEY (productId) REFERENCES products(productId);

ALTER TABLE images
ADD CONSTRAINT fk_images_products
FOREIGN KEY (productId) REFERENCES products(productId);

-- Exercise 03

SELECT * From products;

select * FRom orders
where totalPrice > 500000;

select storeName,addressStore from stores;

select * from users
where email Like '%@gmail.com';

select * from reviews
where rate = 5;

SELECT * FROM products
where quantity < 10;

SELECT * FROM products
where categoryId = 1;

SELECT count(*) from users;

select sum(totalPrice) from orders;

select * FROM orders
order by totalPrice desc
limit 1;

select * from stores
where statusstore = 1;

select c.categoryName, count(p.productId) from categories c
join products p On p.categoryId = c.categoryId
group by p.categoryId;

SELECT * FROM products p
JOIN reviews r ON p.productId = r.productId
WHERE r.reviewId IS NULL;

select p.productName, sum(o.quantityOrder) from products p
join order_details o on o.productId = p.productId
group by p.productId;

SELECT * from users u
join orders o on o.userId = u.userId
where o.orderId is null;

select s.storeName, count(o.storeId) from stores s
join orders o on o.storeId = s.storeId
group by o.storeId;

select p.productName, count(i.productId)from products p
join images i on i.productId = p.productId
group by i.productId;

select p.productName, count(r.productId), avg(r.rate) from products p
left join reviews r on r.productId = p.productId
group by p.productId;

SELECT u.userId, u.userName, COUNT(r.reviewId) FROM users u
JOIN reviews r ON u.userId = r.userId
GROUP BY u.userId, u.userName
ORDER BY COUNT(r.reviewId) DESC
LIMIT 1;

SELECT p.productId, p.productName, SUM(od.quantityOrder) from products p
JOIN order_details od ON p.productId = od.productId
GROUP BY p.productId, p.productName
ORDER BY SUM(od.quantityOrder) DESC
LIMIT 3;

SELECT p.productId, p.productName, SUM(od.quantityOrder) from products p
JOIN order_details od ON p.productId = od.productId
WHERE p.storeId = 'S001'
GROUP BY p.productId, p.productName
ORDER BY SUM(od.quantityOrder) DESC
LIMIT 1;

SELECT productName, (price * quantity) AS `values` from products
WHERE (price * quantity) > 1000000;

select s.storeName from stores s
Join products p on s.storeId = p.storeId
join order_details od on od.productId = p.productId
group by s.storeName
order by sum(od.priceOrder * od.quantityOrder) desc
limit 1;

select u.userName, sum(o.totalPrice * o.quam) from users u
join orders o on o.userId = u.userId
group by o.userId;

select u.userName, SUM(od.priceOrder * od.quantityOrder) FROM users u
JOIN orders o ON u.userId = o.userId
JOIN order_details od ON o.orderId = od.orderId
GROUP BY u.userId;

select o.orderId, o.userId, o.storeId, SUM(od.priceOrder * od.quantityOrder) AS totalValue FROM orders o
join order_details od ON o.orderId = od.orderId
GROUP BY o.orderId
ORDER BY totalValue DESC
LIMIT 1;

select SUM(od.quantityOrder) / COUNT(DISTINCT o.orderId) AS trungbinh FROM order_details od
join orders o ON od.orderId = o.orderId;

select p.productName, SUM(c.quantityCart) FROM products p
join carts c ON p.productId = c.productId
GROUP BY p.productName;

SELECT p.productName, p.quantity, SUM(od.quantityOrder) FROM products p
join order_details od ON p.productId = od.productId
GROUP BY p.productId
HAVING p.quantity = 0 AND SUM(od.quantityOrder) > 0;

SELECT o.orderId, o.createDateOrder, o.totalPrice FROM orders o
join users u ON o.userId = u.userId
WHERE u.email = 'duong@gmail.com';

select s.storeId, s.storeName, SUM(p.quantity) from stores s
LEFT JOIN products p ON s.storeId = p.storeId
GROUP BY s.storeId;

-- exercise 4
Create view expensive_products AS
Select productName, price from products
WHERE price > 500000;

SELECT * FROM expensive_products;

-- vì view là bảng ảo cho nên không thể cập nhật giá trị trực tiếp qua view,
-- nếu muốn cập nhật thì chỉ có thể cập nhật qua bảng gốc products update poducts => set price

DROP VIEW expensive_products;

Create view Infor AS
Select p.productName, c.categoryName from products p
join categories c on c.categoryId = p.categoryId;

-- exercise 5
CREATE INDEX idx_productName ON products(productName);

SHOW INDEXES FROM products;

DROP INDEX idx_productName ON products;

DELIMITER $$
CREATE PROCEDURE getProductByPrice(IN priceInput INT)
BEGIN
    SELECT productName, price, quantity
    FROM products
    WHERE price > priceInput;
END$$
DELIMITER $$;

Call getProductByPrice(500000);

DELIMITER $$
create PROCEDURE getOrderDetails (in orderId varchar(255))
BEGIN
	select * from order_details od
	where od.oderId = orderId;
END$$
DELIMITER $$;

DROP PROCEDURE getOrderDetails;

DELIMITER $$
create PROCEDURE addNewProduct(IN productName varchar(255), in price decimal(10,2), in `description` varchar(255),
in quantity int)
BEGIN
	insert into products(productName, price, description,quantity)
    values(productName, price, description,quantity);
END$$
DELIMITER $$;

DELIMITER $$
create PROCEDURE deleteProductById (in productIds varchar(255))
BEGIN
	delete from products
    where productId = productIds;
END$$
DELIMITER $$;

DELIMITER $$
create PROCEDURE searchProductByName  (in `name` varchar(255))
BEGIN
	select * from products
    where productName like '%name%';
END$$
DELIMITER $$;

DELIMITER $$
create PROCEDURE filterProductsByPriceRange (in minPrice decimal(10,2), in maxPrice decimal(10,2))
BEGIN
	select * from products
    where price < maxPrice and price > minPrice;
END$$
DELIMITER $$;


DELIMITER $$
CREATE PROCEDURE paginateProducts (IN page_size INT, IN page_number INT)
BEGIN
    DECLARE off_setvalue INT;
    SET off_setvalue = page_size * (page_number - 1);
    SELECT * FROM products
    LIMIT page_size 
    OFFSET off_setvalue;
END $$
DELIMITER ;

CALL paginateProducts(5,2);