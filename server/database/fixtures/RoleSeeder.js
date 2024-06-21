const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)

class RoleSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Role", truncate: true, dependencies: [] });
  }

  // The run method - Populate the 'Role' table with fake data

  run() {
    // Generate and insert fake data into the 'Role' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake Role data
      const fakeRole = {
        name: this.faker.person.jobType(), // Generate a fake title using faker library
        refName: `role_${i}`, // Create a reference name for the user
      };

      // Insert the fakeRole data into the 'Role' table
      this.insert(fakeRole); // insert into Role(title, user_id) values (?, ?)
    }
  }
}

// Export the RoleSeeder class
module.exports = RoleSeeder;
