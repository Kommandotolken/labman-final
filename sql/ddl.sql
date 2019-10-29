-- use the right database
use lab;

--
-- Drop all table in order
--
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS eqkategori;
DROP TABLE IF EXISTS kategori;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS log;

--
-- Create tables in right order
--
CREATE TABLE users (
	id VARCHAR(15),
	fornamn VARCHAR(100),
    efternamn VARCHAR(100),
    hashpassword VARCHAR(200),
    email VARCHAR(50),
    usertype VARCHAR(20) DEFAULT "student",
    avdelning VARCHAR(100) DEFAULT "CS",    
    
    PRIMARY KEY (id)
);

CREATE TABLE equipment (
	namn VARCHAR(50),
    id VARCHAR(15),
    bild VARCHAR(100),
    
    PRIMARY KEY (id)
);

CREATE TABLE kategori (
	typ VARCHAR(20),
    
    PRIMARY KEY (typ)
);

CREATE TABLE eqkategori (
	equipmentid VARCHAR(15),
    kategori VARCHAR(20),
    
    FOREIGN KEY (equipmentid) REFERENCES equipment (id),
    FOREIGN KEY (kategori) REFERENCES kategori (typ)
);

CREATE TABLE booking (
	bookingid INT NOT NULL AUTO_INCREMENT UNIQUE,
    userid VARCHAR(15),
    equipmentid VARCHAR(15),
    bookingstatus VARCHAR(20) DEFAULT "Pending",
    bookedfrom TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returnby TIMESTAMP DEFAULT NULL,
    actualreturn TIMESTAMP DEFAULT NULL,
    
    PRIMARY KEY (userid, equipmentid),
    FOREIGN KEY (userid) REFERENCES users (id),
    FOREIGN KEY (equipmentid) REFERENCES equipment (id)
);

CREATE TABLE log (
	logtext VARCHAR(200),
    typ VARCHAR(20),
    ts TIMESTAMP
);




-- PROCEDURE
DROP PROCEDURE IF EXISTS return_date;
DELIMITER ;;
CREATE PROCEDURE return_date( 
	b_id INT
)
BEGIN
	UPDATE booking SET returnby = DATE_ADD(NOW(), INTERVAL 1 DAY) WHERE booking.bookingid = b_id;
END
;;
DELIMITER ;

-- INSERT INTO booking(userid, equipmentid) VALUES('heth14', 'mac1');
-- INSERT INTO booking(userid, equipmentid) VALUES('abcd14', 'mac2');


-- VIEWS
-- 
DROP VIEW IF EXISTS v_bookinglist;
CREATE VIEW v_bookinglist AS
SELECT eq.id  AS 'id', eq.namn AS 'namn', booking.bookingstatus as 'status', 
booking.bookedfrom as 'fran' , booking.returnby AS 'till', booking.bookingid AS 'bookingID'
FROM equipment AS eq 
-- WHERE booking.bookingstatus != 'Not confirmed'
LEFT JOIN booking ON booking.equipmentid = eq.id;
-- WHERE booking.bookingstatus != 'Not confirmed';
 
DROP VIEW IF EXISTS v_account;
CREATE VIEW v_account AS
SELECT u.id AS 'akronym', u.fornamn AS 'namn', u.email AS 'email', u.usertype AS 'privilegier', u.avdelning AS 'avdelning', 
booking.bookingid AS 'bookingid', booking.equipmentid AS 'equipmentid', booking.bookingstatus 
AS 'bookingstatus', booking.bookedfrom AS 'bookedfrom', booking.returnby AS 'returnby', 
booking.actualreturn AS 'actual return'
FROM users AS u
LEFT JOIN booking ON booking.userid = u.id;


SELECT * FROM v_bookinglist;

SELECT * FROM v_account;

SELECT * FROM equipment;

SELECT * FROM booking;
SELECT * FROM booking WHERE booking.userid = 'heth14';

SELECT * FROM users;

