const AbstractSeeder = require("./AbstractSeeder");
const BrandSeeder = require("./BrandSeeder");

class ModelSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Model", truncate: true, dependencies: [BrandSeeder] });
  }

  // The run method - Populate the 'Model' table with fake data

  run() {
    // Generate and insert fake data into the 'Model' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake Model data
      const fakeModel = {
        name: this.faker.vehicle.model(), // Generate a fake vehicule using faker library
        plug_type: this.faker.vehicle.fuel(),
        // Foreign Keys
        brand_id: this.getRef(`brand_${i}`).insertId, // Get the insertId of the corresponding brand from BrandeSeeder
        refName: `model_${i}`, // Create a reference name for the model
      };

      // Insert the fakeModel data into the 'Model' table
      this.insert(fakeModel); // insert into Model(email, password) values (?, ?)
    }
  }
}

// Export the ModelSeeder class
module.exports = ModelSeeder;
