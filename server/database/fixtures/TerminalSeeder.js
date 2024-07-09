const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class TerminalSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Terminal", truncate: true, dependencies: [] });
  }

  // The run method - Populate the 'Terminal' table with fake data

  run() {
    // Generate and insert fake data into the 'Terminal' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake Terminal data
      const fakeTerminal = {
        isBooked: this.faker.datatype.boolean(),
        name: this.faker.lorem.word(),
        address: this.faker.location.streetAddress(),
        cood: this.faker.location.longitude(),
        power: this.faker.number.int(),
        plug_type: this.faker.vehicle.fuel(),
        chain_name: this.faker.lorem.words(3),
        accessibility: this.faker.lorem.words(3),
        refName: `terminal_${i}`, // Create a reference name for the user
      };

      // Insert the fakeTerminal data into the 'Terminal' table
      this.insert(fakeTerminal); // insert into Terminal(title, user_id) values (?, ?)
    }
  }
}

// Export the TerminalSeeder class
module.exports = TerminalSeeder;
