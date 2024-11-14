-- Exercise 02

ALTER TABLE building
ADD CONSTRAINT PK_building_host
FOREIGN KEY (host_id) REFERENCES `host`(id);


ALTER TABLE building
ADD CONSTRAINT PK_building_contractor
FOREIGN KEY (contractor_id) REFERENCES `contractor`(id);


ALTER TABLE design
ADD CONSTRAINT fk_design_building
FOREIGN KEY (building_id) REFERENCES building(id);



ALTER TABLE design
ADD CONSTRAINT fk_design_architect
FOREIGN KEY (architect_id) REFERENCES architect(id);


ALTER TABLE work
ADD CONSTRAINT fk_work_building
FOREIGN KEY (building_id) REFERENCES building(id);


ALTER TABLE work
ADD CONSTRAINT fk_work_worker
FOREIGN KEY (worker_id) REFERENCES worker(id);

-- Exercise 03

SELECT * FROM building
ORDER BY(cost) DESC
LIMIT 1;

SELECT * FROM building
WHERE cost > 
(
	SELECT MAX(cost) FROM building
    WHERE city = 'can tho'
)
AND city <> 'can tho';

SELECT * FROM building
WHERE cost > 
(
	SELECT MIN(cost) FROM building
    WHERE city = 'can tho'
)
AND city <> 'can tho';

SELECT * FROM building
WHERE id NOT IN
(SELECT building_id FROM design); --


SELECT a1.name, a1.birthday, a1.place FROM architect a1
WHERE (a1.birthday, a1.place) IN (
    SELECT a2.birthday, a2.place
    FROM architect a2
    GROUP BY a2.birthday, a2.place
    HAVING COUNT(*) > 1
);


-- Exercise 04

SELECT architect_id, avg(benefit) FROM design
GROUP BY (architect_id);

SELECT city, SUM(cost) as total_cost FROM building
GROUP by city;

SELECT b.*
FROM building b
JOIN design d ON b.id = d.building_id
WHERE d.benefit > 50;

SELECT DISTINCT b.city FROM building b
JOIN design d ON b.id = d.building_id
JOIN architect a ON d.architect_id = a.id
WHERE a.place IS NOT NULL;

-- Exercise 05

SELECT b.name AS building_name, h.name AS host_name, c.name AS contractor_name
FROM building b
JOIN host h ON b.host_id = h.id
JOIN contractor c ON b.contractor_id = c.id;

SELECT b.name AS building_name, a.name AS architect_name, d.benefit AS architect_fee
FROM building b
JOIN design d ON b.id = d.building_id
JOIN architect a ON d.architect_id = a.id;

SELECT b.name, b.address FROM building b
JOIN contractor c ON b.contractor_id = c.id
WHERE c.name = 'cty xd so 6';

SELECT c.name, c.address FROM contractor c
JOIN building b ON c.id = b.contractor_id
JOIN design d ON b.id = d.building_id
JOIN architect a ON d.architect_id = a.id
WHERE b.city = 'can tho' AND a.name = 'le kim dung';

SELECT a.place FROM architect a
JOIN design d ON a.id = d.architect_id
JOIN building b ON d.building_id = b.id
WHERE b.name = 'khach san quoc te' AND b.city = 'can tho';
------------------
SELECT w.name , w.birthday, w.skill FROM worker w
JOIN work wo ON w.id = wo.worker_id
JOIN building b ON wo.building_id = b.id
JOIN contractor c ON b.contractor_id = c.id
WHERE (w.skill = 'han' OR w.skill = 'dien') AND c.name = 'le van son';

SELECT DISTINCT a.name , a.birthday FROM architect a
JOIN design d ON a.id = d.architect_id
JOIN building b ON d.building_id = b.id
WHERE a.place = 'tp hcm' AND b.cost > 400;

SELECT `name` FROM building
ORDER BY cost DESC
LIMIT 1;

SELECT DISTINCT a.name FROM architect a
JOIN design d1 ON a.id = d1.architect_id
JOIN building b1 ON d1.building_id = b1.id
JOIN contractor c1 ON b1.contractor_id = c1.id
JOIN design d2 ON a.id = d2.architect_id
JOIN building b2 ON d2.building_id = b2.id
JOIN contractor c2 ON b2.contractor_id = c2.id
WHERE c1.name = 'phong dich vu so xd' AND c2.name = 'le van son';

SELECT w.name FROM worker w
JOIN work wo1 ON w.id = wo1.worker_id
JOIN building b1 ON wo1.building_id = b1.id
WHERE b1.city = 'can tho'
  AND w.id NOT IN (
      SELECT w2.id
      FROM worker w2
      JOIN work wo2 ON w2.id = wo2.worker_id
      JOIN building b2 ON wo2.building_id = b2.id
      WHERE b2.city = 'vinh long'
  );

SELECT DISTINCT c.name FROM contractor c
JOIN building b ON c.id = b.contractor_id
WHERE b.cost > (
    SELECT MAX(b1.cost)
    FROM building b1
    JOIN contractor c1 ON b1.contractor_id = c1.id
    WHERE c1.name = 'phong dich vu so xd'
);

SELECT w.name FROM worker w
JOIN work wo ON w.id = wo.worker_id
JOIN building b ON wo.building_id = b.id
JOIN design d ON b.id = d.building_id
WHERE d.benefit < (SELECT AVG(benefit) FROM design);

SELECT c.name , c.address FROM contractor c
JOIN building b ON c.id = b.contractor_id
WHERE b.cost = (SELECT MIN(cost) FROM building);

SELECT c.name, c.address FROM contractor c
JOIN building b ON c.id = b.contractor_id
WHERE b.cost = (SELECT MIN(cost) FROM building);

SELECT w.name, w.skill FROM worker w
JOIN work wo ON w.id = wo.worker_id
JOIN building b ON wo.building_id = b.id
JOIN design d ON b.id = d.building_id
JOIN architect a ON d.architect_id = a.id
WHERE a.name = 'le thanh tung';

SELECT distinct c1.name AS contractor1, c2.name AS contractor2
FROM contractor c1
JOIN building b1 ON c1.id = b1.contractor_id
JOIN contractor c2 ON c1.id <> c2.id
JOIN building b2 ON c2.id = b2.contractor_id
WHERE b1.city = b2.city;

SELECT a.name FROM architect a
JOIN design d ON a.id = d.architect_id
GROUP BY a.name
HAVING SUM(d.benefit) > 25;


SELECT c.name, SUM(b.cost) AS total_cost FROM contractor c
JOIN building b ON c.id = b.contractor_id
GROUP BY c.name;


SELECT count(*) count from (select a.name, b.total
      from architect a
             inner join (select architect_id, sum(benefit) total from design group by architect_id having total > 25) b
                        on a.id = b.architect_id) a;

SELECT b.name , COUNT(w.id) AS total_workers FROM building b
JOIN work wo ON b.id = wo.building_id
JOIN worker w ON wo.worker_id = w.id
GROUP BY b.name;

SELECT b.name AS building_name, b.address AS building_address
FROM building b
JOIN work wo ON b.id = wo.building_id
GROUP BY b.name, b.address
ORDER BY COUNT(wo.worker_id) DESC
LIMIT 1;

SELECT b.city, AVG(b.cost) AS average_cost FROM building b
GROUP BY b.city;

SELECT wr.name, sum(w.total) days
from worker wr
       inner join work w on wr.id = w.worker_id
GROUP BY w.worker_id
HAVING days > (select sum(total) total
               from work w
                      inner join worker wr on w.worker_id = wr.id
               where wr.name = 'nguyen hong van');

SELECT c.name AS contractor_name, b.city AS city_name, COUNT(b.id) AS total_projects
FROM contractor c
JOIN building b ON c.id = b.contractor_id
GROUP BY c.name, b.city;

SELECT w.name FROM worker w
JOIN work wo ON w.id = wo.worker_id
GROUP BY w.name
HAVING COUNT(DISTINCT wo.building_id) = (SELECT COUNT(*) FROM building);


SELECT * FROM architect;
SELECT * FROM building;
SELECT * FROM design;
SELECT * FROM contractor;
SELECT * FROM work;
SELECT * FROM worker;


-- Bai 6

CREATE database company;
use company;

CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    age INT,
    salary DECIMAL(10, 2)
);

CREATE TABLE Department (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50) UNIQUE
);

CREATE TABLE Employee_Department (
    employee_id INT,
    department_id INT,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id),
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

---
SELECT e.employee_id, e.employee_name
FROM Employee e
JOIN Employee_Department ed ON e.employee_id = ed.employee_id
JOIN Department d ON ed.department_id = d.department_id
WHERE d.department_name = 'ke toan';

SELECT employee_id, employee_name, salary
FROM Employee
WHERE salary > 50000;

SELECT d.department_name, COUNT(ed.employee_id) AS employee_count
FROM Department d
LEFT JOIN Employee_Department ed ON d.department_id = ed.department_id
GROUP BY d.department_name;


SELECT d.department_name, e.employee_id, e.employee_name, e.salary
FROM Employee e
JOIN Employee_Department ed ON e.employee_id = ed.employee_id
JOIN Department d ON ed.department_id = d.department_id
WHERE e.salary = (
    SELECT MAX(e2.salary)
    FROM Employee e2
    JOIN Employee_Department ed2 ON e2.employee_id = ed2.employee_id
    WHERE ed2.department_id = ed.department_id
);

SELECT d.department_name, SUM(e.salary) AS total_salary
FROM Employee e
JOIN Employee_Department ed ON e.employee_id = ed.employee_id
JOIN Department d ON ed.department_id = d.department_id
GROUP BY d.department_name
HAVING SUM(e.salary) > 100000;

SELECT e.employee_id, e.employee_name, COUNT(ed.department_id) AS department_count
FROM Employee e
JOIN Employee_Department ed ON e.employee_id = ed.employee_id
GROUP BY e.employee_id, e.employee_name
HAVING COUNT(ed.department_id) > 2;
--





