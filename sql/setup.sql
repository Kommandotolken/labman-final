--
-- Create database eshop
--
CREATE DATABASE IF NOT EXISTS lab;
-- use it
USE lab;

--
-- Create user
--
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'pass';

--
-- Grant privileges to user
--
GRANT ALL PRIVILEGES ON lab.* TO 'user'@'%';