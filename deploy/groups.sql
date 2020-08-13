-- Deploy kita-db:groups to mysql

BEGIN;

CREATE TABLE groups (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(256),
    floor ENUM('1','2','3'),
    PRIMARY KEY (id)
);
COMMIT;
