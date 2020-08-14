CREATE TABLE parents (
                          id INT NOT NULL AUTO_INCREMENT,
                          name VARCHAR(256) NOT NULL,
                          email VARCHAR(256) NOT NULL,
                          PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE children_to_parents
(
    id     INT NOT NULL AUTO_INCREMENT,
    child  INT NOT NULL,
    parent INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (child) REFERENCES children(id),
    FOREIGN KEY (parent) REFERENCES parents(id)
);