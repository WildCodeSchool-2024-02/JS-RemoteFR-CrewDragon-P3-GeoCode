const AbstractRepository = require("./AbstractRepository");

class CarRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "car" as configuration
    super({ table: "car" });
  }

  // The C of CRUD - Create operation

  async create(car) {
    // Execute the SQL INSERT query to add a new car to the "car" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [car.title, car.user_id]
    );

    // Return the ID of the newly inserted car
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific car by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the car
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all cars from the "car" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of cars
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing car

  // async update(car) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an car by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = CarRepository;
