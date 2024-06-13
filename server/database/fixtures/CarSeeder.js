const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");
const ModelSeeder = require("./ModelSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class CarSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "Car",
      truncate: true,
      dependencies: [UserSeeder, ModelSeeder],
    });
  }

  // The run method - Populate the 'Car' table with fake data

  run() {
    // Generate and insert fake data into the 'Car' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake Car data
      const fakeCar = {
        image: this.faker.image.urlPlaceholder(), // Generate a fake title using faker library
        name: this.faker.person.firstName(),
        // Foreign Keys
        user_id: this.getRef(`user_${i}`).insertId, // Get the insertId of the corresponding user from UserSeeder
        model_id: this.getRef(`model_${i}`).insertId, // Get the insertId of the corresponding model from ModelSeeder
      };

      // Insert the fakeCar data into the 'Car' table
      this.insert(fakeCar); // insert into Car(title, user_id) values (?, ?)
    }
  }
}

// Export the CarSeeder class
module.exports = CarSeeder;
