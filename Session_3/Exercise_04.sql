SELECT * FROM architect
WHERE `name` = 'le thanh tung';

SELECT `name`,birthday FROM worker
WHERE skill = 'han' OR skill = 'dien';

SELECT `name`, `birthday` 
FROM `worker`
WHERE `skill` IN('han', 'dien') AND birthday > 1948;


SELECT * FROM `worker`
WHERE `birthday` + 20 > `year`;


SELECT * FROM `worker`
WHERE `birthday` IN(1945, 1940, 1948);

SELECT *
FROM `worker`
WHERE `birthday` = 1945 
   OR `birthday` = 1940 
   OR `birthday` = 1948;
   

SELECT * FROM `building`
WHERE cost BETWEEN 200000000 AND 500000000;

SELECT * FROM building
WHERE cost >= 200000000 AND cost <= 500000000;


SELECT * FROM `architect`
WHERE `name` LIKE 'nguyen%';


SELECT * FROM `architect`
WHERE `name` LIKE '%anh%';


SELECT *
FROM architect
WHERE `name` LIKE '%th_';


SELECT *
FROM contractor
WHERE phone IS NULL;

