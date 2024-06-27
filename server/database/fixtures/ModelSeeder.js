const AbstractSeeder = require("./AbstractSeeder");
const BrandSeeder = require("./BrandSeeder");
const brandData = require("../../app/services/brandData"); // Assurez-vous de fournir le bon chemin

class ModelSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Model", truncate: true, dependencies: [BrandSeeder] });
  }

  // The run method - Populate the 'Model' table with fake data

  run() {
    // Generate and insert data into the 'Model' table
    for (let i = 0; i < brandData.length; i += 1) {
      // iterate throught Brand
      for (let j = 0; j < brandData[i].models.length; j += 1) {
        // Generate  Model data
        const model = {
          name: brandData[i].models[j].name, // Generate a model
          plug_type: "usb type C",
          // Foreign Keys
          brand_id: this.getRef(`brand_${i}`).insertId, // Get the insertId of the corresponding brand from BrandeSeeder
          refName: `model_${i}`, // Create a reference name for the model
        };

        // Insert the fakeModel data into the 'Model' table
        this.insert(model); // insert into Model(name, plug_type) values (?, ?)
      }
    }
  }
}

// Export the ModelSeeder class
module.exports = ModelSeeder;
