const AbstractRepository = require("./AbstractRepository");

class TerminalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "terminal" as configuration
    super({ table: "terminal" });
  }

  // The C of CRUD - Create operation

  async create(terminal) {
    // Execute the SQL INSERT query to add a new terminal to the "terminal" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [terminal.title, terminal.user_id]
    );

    // Return the ID of the newly inserted terminal
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific terminal by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the terminal
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all terminals from the "terminal" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of terminals
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing terminal

  // async update(terminal) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an terminal by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = TerminalRepository;
