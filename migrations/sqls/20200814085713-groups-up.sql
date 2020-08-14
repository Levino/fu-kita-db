create table `groups` (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(30) NOT NULL,
     floor ENUM('1','2','3'),
     PRIMARY KEY (id)
);