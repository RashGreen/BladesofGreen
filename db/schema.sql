-- Drops the bladesOfGreen_db db if it exists currently --
DROP DATABASE IF EXISTS bladesOfGreen_db;
-- Creates the "bladesOfGreen_db" database --
CREATE DATABASE bladesOfGreen_db;


USE bladesOfGreen_db;

-- Creates the table "customer" within bladesOfGreen_db --
CREATE TABLE customers (
    id INT NOT NULL  AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street_add1 VARCHAR(100) NOT NULL,
    street_add2 VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip INT NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE inventory (
    id INT NOT NULL  AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_sku VARCHAR(100) NOT NULL,
    onHand INT,
    PRIMARY KEY (id)
    );
    
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    squareTxnId INT NOT NULL,
    PRIMARY KEY (id)
);
