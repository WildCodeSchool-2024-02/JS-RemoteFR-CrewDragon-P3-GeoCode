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
      `insert into ${this.table} (title, car_id) values (?, ?)`,
      [car.title, car.car_id]
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
  async update(car) {
    // Execute the SQL UPDATE query to update a specific car

    const [result] = await this.database.query(
      `update ${this.table} set name = ? where id = ?`,

      [car.name, car.id]
    );

    // Return how many rows were affected
    console.info(result.affectedRows);
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific car

    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,

      [id]
    );

    // Return how many rows were affected

    return result.affectedRows;
  }
}

module.exports = CarRepository;
