SELECT * FROM architect;

SELECT `name`,sex FROM architect;

SELECT DISTINCT `birthday` FROM architect;

SELECT `name`,birthday 
FROM architect
ORDER BY birthday ASC;

SELECT `name`,birthday 
FROM architect
ORDER BY birthday DESC;

SELECT * FROM building
ORDER BY cost ASC, address ASC;

