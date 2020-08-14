CREATE TABLE children (
                      id INT NOT NULL AUTO_INCREMENT,
                      name VARCHAR(256) NOT NULL,
                      gruppe INT NOT NULL,
                      PRIMARY KEY (id),
                      FOREIGN KEY(gruppe) REFERENCES gruppen(id)
) ENGINE=INNODB;
