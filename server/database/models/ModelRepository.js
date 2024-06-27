const AbstractRepository = require("./AbstractRepository");

class ModelRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "model" as configuration
    super({ table: "model" });
  }

  // The C of CRUD - Create operation

  async create(model) {
    // Execute the SQL INSERT query to add a new model to the "model" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [model.title, model.user_id]
    );

    // Return the ID of the newly inserted model
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific model by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the model
    return rows[0];
  }

  async readAllWithBrand() {
    // Execute the SQL SELECT query to retrieve all brands from the "brand" table
    const [rows] = await this.database.query(
      `SELECT model.*, brand.*
         FROM ${this.table} AS model
         JOIN brand ON model.brand_id = brand.id`
    );
    // Return the first row of the result, which represents the model
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing model

  // async update(model) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an model by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ModelRepository;
