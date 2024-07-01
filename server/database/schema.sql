-- SQLBook: Code
create table role (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL
);

create table user (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  hashed_password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  birthday DATE, 
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
  image VARCHAR(255) NOT NULL,
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

INSERT INTO brand (name) VALUES 
('Tesla'),
('Nissan'),
('Chevrolet'),
('BMW'),
('Hyundai'),
('Volkswagen'),
('Renault'),
('Audi'),
('Ford'),
('Kia');

INSERT INTO role (id, name) VALUES 
(1, 'User'),
(2, 'Admin');

INSERT INTO user (
  avatar,
  email,
  hashed_password,
  firstname,
  lastname,
  birthday,
  address,
  zip_code,
  city,
  role_id
) VALUES (
  'default_avatar.png',
  'admin123@example.com',
  '$argon2id$v=19$m=19456,t=2,p=1$YuTUonvj6kDs1gtygYcjpg$fDUntM/0R/oJyXsNf0z0r+jepTG58vMfGkf7Bsjwqig',
  'John',
  'Doe',
  '1985-07-15',
  '456 Admin Lane',
  '67890',
  'Adminville',
  2
);


INSERT INTO model (name, plug_type, brand_id) VALUES 
('Model S', 'Type 2', 1),
('Model 3', 'Type 2', 1),
('Model X', 'Type 2', 1),
('Model Y', 'Type 2', 1),
('Leaf', 'CHAdeMO', 2),
('Ariya', 'Type 2', 2),
('Bolt EV', 'CCS', 3),
('Bolt EUV', 'CCS', 3),
('i3', 'CCS', 4),
('i4', 'CCS', 4),
('iX3', 'CCS', 4),
('iX', 'CCS', 4),
('Kona Electric', 'CCS', 5),
('Ioniq Electric', 'CCS', 5),
('Ioniq 5', 'CCS', 5),
('ID.3', 'CCS', 6),
('ID.4', 'CCS', 6),
('ID. Buzz', 'CCS', 6),
('Zoe', 'Type 2', 7),
('Twingo Electric', 'Type 2', 7),
('Megane E-Tech', 'Type 2', 7),
('e-tron', 'CCS', 8),
('Q4 e-tron', 'CCS', 8),
('e-tron GT', 'CCS', 8),
('Mustang Mach-E', 'CCS', 9),
('F-150 Lightning', 'CCS', 9),
('Soul EV', 'CCS', 10),
('Niro EV', 'CCS', 10),
('EV6', 'CCS', 10);
