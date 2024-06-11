-- SQLBook: Code
create table user (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL, 
  address VARCHAR(255) NOT NULL,
  zip_code INT NOT NULL,
  city VARCHAR(255) NOT NULL, 
  role_id INT NOT NULL,
      CONSTRAINT fk_user_role      
      FOREIGN KEY (role_id)             
      REFERENCES role(id)   
);

create table role (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL,
);

create table car (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  image TEXT NOT NULL,
  user_id INT NOT NULL,
      CONSTRAINT fk_car_user     
      FOREIGN KEY (user_id)             
      REFERENCES user(id),
  model_id INT NOT NULL,
      CONSTRAINT fk_car_model     
      FOREIGN KEY (model_id)             
      REFERENCES model(id)
  
);

create table model (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL,
  plug_type VARCHAR(255) NOT NULL,
  brand_id INT NOT NULL,
      CONSTRAINT fk_model_brand    
      FOREIGN KEY (brand_id)             
      REFERENCES brand(id)
);

create table brand (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL,
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
  accessibility VARCHAR(255),
);

create table booking (
id INT unsigned PRIMARY KEY auto_increment NOT NULL, 
date DATE NOT NULL, 
starting_hour TIME NOT NULL, 
end_hour TIME NOT NULL, 
terminal_id INT NOT NULL,
      CONSTRAINT fk_booking_terminal     
      FOREIGN KEY (terminal_id)             
      REFERENCES terminal(id),
user_id INT NOT NULL,
      CONSTRAINT fk_booking_user     
      FOREIGN KEY (user_id)             
      REFERENCES user(id),
);