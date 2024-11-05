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