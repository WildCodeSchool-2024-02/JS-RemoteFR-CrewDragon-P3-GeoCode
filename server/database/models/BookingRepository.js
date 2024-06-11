const AbstractRepository = require("./AbstractRepository");

class BookingRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "booking" as configuration
    super({ table: "booking" });
  }

  // The C of CRUD - Create operation

  async create(booking) {
    // Execute the SQL INSERT query to add a new booking to the "booking" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [booking.title, booking.user_id]
    );

    // Return the ID of the newly inserted booking
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific booking by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the booking
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all bookings from the "booking" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of bookings
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing booking

  // async update(booking) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an booking by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = BookingRepository;
