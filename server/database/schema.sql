-- SQLBook: Code
create table role (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL
);

create table user (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  image BLOB NOT NULL, 
  email VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL, 
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL, 
  address VARCHAR(255) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  city VARCHAR(255) NOT NULL, 
  role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE
);

create table brand (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL
);

create table model (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL,
  plug_type VARCHAR(255) NOT NULL,
  brand_id INT UNSIGNED NOT NULL,
  FOREIGN KEY(brand_id) REFERENCES brand(id) ON DELETE CASCADE
);

CREATE TABLE car (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  model_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (model_id) REFERENCES model(id) ON DELETE CASCADE,
  image BLOB NOT NULL,
  name VARCHAR(255) NOT NULL
);


create table terminal (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  isBooked BOOLEAN NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  xlongitude FLOAT NOT NULL,
  ylatitude FLOAT NOT NULL,
  power VARCHAR(80),
  plug_type VARCHAR(255) NOT NULL,
  chain_name VARCHAR(255),
  accessibility VARCHAR(255)
);

create table booking (
id INT unsigned PRIMARY KEY auto_increment NOT NULL, 
date DATE NOT NULL, 
starting_hour TIME NOT NULL, 
end_hour TIME NOT NULL, 
terminal_id INT UNSIGNED NOT NULL,
FOREIGN KEY(terminal_id) REFERENCES terminal(id) ON DELETE CASCADE,
user_id INT UNSIGNED NOT NULL,
FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
);