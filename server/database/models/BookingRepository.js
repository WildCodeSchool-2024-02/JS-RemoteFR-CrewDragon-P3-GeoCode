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
    console.info("coucou repo booking", booking);

    const [result] = await this.database.query(
      `insert into ${this.table} (date, slot, terminal_id, user_id ) values (?, ?, ?, ?)`,
      [booking.date, booking.slot, booking.terminal_id, booking.user_id]
    );

    // Return the ID of the newly inserted booking
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific car by its ID
    const [rows] = await this.database.query(
      `SELECT booking.* 
     FROM ${this.table} AS booking 
     JOIN terminal ON booking.terminal_id = terminal.id
     JOIN user ON booking.user_id = user.id 
     WHERE booking.id = ?`,
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
