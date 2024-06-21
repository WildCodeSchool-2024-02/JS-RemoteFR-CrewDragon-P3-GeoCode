const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, avatar, email, password, address, zip_code, city, role_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.avatar,
        user.email,
        user.password,
        user.address,
        user.zip_code,
        user.city,
        user.role_id,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `SELECT user.*, car.*
         FROM ${this.table} AS user
         JOIN car ON car.user_id = user.id
         WHERE user.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  async update(user) {
    // Execute the SQL UPDATE query to update a specific user

    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ? where id = ?`,

      [user.firstname, user.lastname, user.id]
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
