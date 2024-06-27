const AbstractSeeder = require("./AbstractSeeder");
const brandData = require("../../app/services/brandData");

class BrandSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Brand", truncate: true, dependencies: [] });
  }

  // The run method - Populate the 'Brand' table

  run() {
    // Generate and insert data into the 'Brand' table
    for (let i = 0; i < brandData.length; i += 1) {
      // Generate Brand data
      const brand = {
        name: brandData[i].name, // Generate a vehicule brand
        refName: `brand_${i}`, // Create a reference name for the brand
      };

      // Insert the brand data into the 'Brand' table
      this.insert(brand); // insert into Brand(name) values (?)
    }
  }
}

// Export the BrandSeeder class
module.exports = BrandSeeder;
