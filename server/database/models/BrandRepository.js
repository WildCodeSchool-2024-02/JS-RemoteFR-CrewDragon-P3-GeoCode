const AbstractRepository = require("./AbstractRepository");

class BrandRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "brand" as configuration
    super({ table: "brand" });
  }

  // The C of CRUD - Create operation

  async create(brand) {
    // Execute the SQL INSERT query to add a new brand to the "brand" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [brand.title, brand.user_id]
    );

    // Return the ID of the newly inserted brand
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific brand by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the brand
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all brands from the "brand" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of brands
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing brand

  // async update(brand) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an brand by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = BrandRepository;
