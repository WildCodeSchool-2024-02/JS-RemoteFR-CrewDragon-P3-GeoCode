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
      `insert into ${this.table} (title, terminal_id) values (?, ?)`,
      [terminal.title, terminal.terminal_id]
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
  async update(terminal) {
    // Execute the SQL UPDATE query to update a specific terminal

    const [result] = await this.database.query(
      `update ${this.table} set name = ? where id = ?`,

      [terminal.name, terminal.id]
    );

    // Return how many rows were affected
    console.info(result.affectedRows);
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific terminal

    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,

      [id]
    );

    // Return how many rows were affected

    return result.affectedRows;
  }
}

module.exports = TerminalRepository;
