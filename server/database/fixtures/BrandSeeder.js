const AbstractSeeder = require("./AbstractSeeder");

class BrandSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Brand", truncate: true, dependencies: [] });
  }

  // The run method - Populate the 'Brand' table with fake data

  run() {
    // Generate and insert fake data into the 'Brand' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake Brand data
      const fakeBrand = {
        name: this.faker.vehicle.manufacturer(), // Generate a fake vehicule brand using faker library
        refName: `brand_${i}`, // Create a reference name for the brand
      };

      // Insert the fakeBrand data into the 'Brand' table
      this.insert(fakeBrand); // insert into Brand(email, password) values (?, ?)
    }
  }
}

// Export the BrandSeeder class
module.exports = BrandSeeder;
