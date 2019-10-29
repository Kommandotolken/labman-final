
--
-- TEST
--


-- CREATE TABLE users (
 -- id VARCHAR(15),
 -- namn VARCHAR(50),
   -- hashpassword VARCHAR(200),
   -- email VARCHAR(50),
   -- usertype VARCHAR(20),
   -- avdelning VARCHAR(100),    
    
   -- PRIMARY KEY (id)
-- );
-- INSERT INTO users VALUES ("heth14", "Henrik Thomasson", "test", "emailadress@adress.com", "student", "CS");

-- CREATE TABLE equipment (
-- namn VARCHAR(50),
--    id VARCHAR(15),
--     bild VARCHAR(100),
    
-- PRIMARY KEY (id)
-- );

INSERT INTO equipment(namn, id) VALUES
("dator pc", "pc1"),
("dator pc", "pc2"),
("dator pc", "pc3"),
("dator pc", "pc4"),
("dator pc", "pc5"),
("dator pc", "pc6"),
("dator mac", "mac1"),
("dator mac", "mac2"),
("dator mac", "mac3"),
("dator mac", "mac4")
;


-- CREATE TABLE kategori (
-- 	typ VARCHAR(20),
    
-- PRIMARY KEY (typ)
-- );

INSERT INTO kategori VALUES ("robot"),
("dator"),
("oscilloskop"),
("lödkolv"),
("kabel");
-- CREATE TABLE eqkategori (
-- equipmentid VARCHAR(15),
--    kategori VARCHAR(20),
    
--    FOREIGN KEY (equipmentid) REFERENCES equipment (id),
--    FOREIGN KEY (kategori) REFERENCES kategori (typ)
-- );



-- CREATE TABLE booking (
 -- bookingid INT NOT NULL AUTO_INCREMENT,
   -- userid VARCHAR(15),
   -- equipmentid VARCHAR(15),
   -- bookingstatus VARCHAR(20),
   -- bookedfrom DEFAULT CURRENT_TIMESTAMP,
   -- returnby TIMESTAMP,
   -- actualreturn TIMESTAMP,
    
    -- PRIMARY KEY (bookingid),
    -- FOREIGN KEY (userid) REFERENCES users (id),
   -- FOREIGN KEY (equipmentid) REFERENCES equipment (id)
-- );

-- INSERT INTO booking ('heth14', 'mac1', 

-- CREATE TABLE log (
-- logtext VARCHAR(200),
   -- typ VARCHAR(20),
  --  ts TIMESTAMP
-- );

--
-- VIEWS
--
