const AbstractRepository = require("./AbstractRepository");

class RoleRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "role" as configuration
    super({ table: "role" });
  }

  // The C of CRUD - Create operation

  async create(role) {
    // Execute the SQL INSERT query to add a new role to the "role" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [role.title, role.user_id]
    );

    // Return the ID of the newly inserted role
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific role by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the role
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all roles from the "role" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of roles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing role

  // async update(role) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an role by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = RoleRepository;
