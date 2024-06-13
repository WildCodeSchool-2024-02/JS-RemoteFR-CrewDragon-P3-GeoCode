const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");
const TerminalSeeder = require("./TerminalSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class BookingSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "Booking",
      truncate: true,
      dependencies: [UserSeeder, TerminalSeeder],
    });
  }

  // The run method - Populate the 'Booking' table with fake data

  run() {
    // Generate and insert fake data into the 'Booking' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake Booking data
      const fakeBooking = {
        date: this.faker.date.past(),
        starting_hour: this.faker.number.float({ fractionDigits: 0 }),
        end_hour: this.faker.number.float({ fractionDigits: 0 }),
        // Foreign Keys
        user_id: this.getRef(`user_${i}`).insertId, // Get the insertId of the corresponding user from UserSeeder
        terminal_id: this.getRef(`terminal_${i}`).insertId, // Get the insertId of the corresponding terminal from TerminalSeeder
      };

      // Insert the fakeBooking data into the 'Booking' table
      this.insert(fakeBooking); // insert into Booking(title, user_id) values (?, ?)
    }
  }
}

// Export the BookingSeeder class
module.exports = BookingSeeder;
