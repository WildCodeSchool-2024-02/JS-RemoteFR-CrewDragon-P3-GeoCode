const AbstractRepository = require("./AbstractRepository");
const CarRepository = require("./CarRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
    this.CarRepository = new CarRepository();
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table

    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, avatar, email, hashed_password, address, zip_code, city, role_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.avatar,
        user.email,
        user.hashedPassword,
        user.address,
        user.zip_code,
        user.city,
        user.role_id,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async createWithCar(user, car) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, birthday, avatar, email, hashed_password, address, zip_code, city, role_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        user.firstname,
        user.lastname,
        user.birthday,
        user.avatar,
        user.email,
        user.hashedPassword,
        user.address,
        user.zip_code,
        user.city,
        user.role_id,
      ]
    );

    // Return the ID of the newly inserted user
    const userId = result.insertId;

    // Execute the SQL INSERT query to add a new car to the "car" table
    // Insert car into the car table using CarRepository
    await this.CarRepository.create({
      name: car.name,
      image: car.image,
      model_id: car.model_id,
      user_id: userId,
    });

    return userId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Convert the id from string to integer
    const userId = parseInt(id, 10);

    // Execute the SQL SELECT query to retrieve a specific user and their cars by user ID
    const [rows] = await this.database.query(
      `SELECT user.*, car.*
         FROM ${this.table} AS user
        JOIN car ON car.user_id = user.id
         WHERE user.id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return null; // No user found with the given ID
    }

    // Extract the user data from the first row
    const user = {
      id: rows[0].id,
      avatar: rows[0].avatar,
      email: rows[0].email,
      hashed_password: rows[0].hashed_password,
      firstname: rows[0].firstname,
      lastname: rows[0].lastname,
      birthday: rows[0].birthday,
      address: rows[0].address,
      zip_code: rows[0].zip_code,
      city: rows[0].city,
      role_id: rows[0].role_id,
      cars: [],
    };

    rows.forEach((row) => {
      if (row.user_id) {
        user.cars.push({
          user_id: row.user_id,
          model_id: row.model_id,
          image: row.image,
          name: row.name,
        });
      }
    });

    console.info("MAJ BDD user / read :", user);

    return user;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async readByEmailWithPassword(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  // The U of CRUD - Update operation
  async update(user) {
    // Execute the SQL UPDATE query to update a specific user

    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, hashed_password = ?, email = ?, address = ?, zip_code = ?, city = ?, avatar = ?, role_id = ? where id = ?`,

      [
        user.firstname,
        user.lastname,
        user.hashedPassword,
        user.email,
        user.address,
        user.zip_code,
        user.city,
        user.avatar,
        user.role_id,
        user.id,
      ]
    );

    // Return how many rows were affected
    console.info(result.affectedRows);
    return result.affectedRows;
  }

  // The U of CRUD - Update operation
  async updateUser(user) {
    // Execute the SQL UPDATE query to update a specific user

    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, address = ?, zip_code = ?, city = ?, avatar = ?, role_id = ? where id = ?`,

      [
        user.firstname,
        user.lastname,
        user.email,
        user.address,
        user.zip_code,
        user.city,
        user.avatar,
        user.role_id,
        user.id,
      ]
    );

    // Return how many rows were affected
    console.info(result.affectedRows);
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific user

    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,

      [id]
    );

    // Return how many rows were affected

    return result.affectedRows;
  }
}

module.exports = UserRepository;
