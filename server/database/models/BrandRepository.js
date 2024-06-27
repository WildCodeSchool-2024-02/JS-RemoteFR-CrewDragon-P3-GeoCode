const AbstractRepository = require("./AbstractRepository");

class BrandRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "brand" as configuration
    super({ table: "brand" });
  }

  // The C of CRUD - Create operation

  async create(brand) {
    // Execute the SQL INSERT query to add a new brand to the "brand" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [brand.title, brand.user_id]
    );

    // Return the ID of the newly inserted brand
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific brand by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the brand
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readAllWithModel() {
    // Exécutez la requête SQL SELECT pour récupérer toutes les marques et les modèles associés
    const [rows] = await this.database.query(
      `SELECT brand.id AS brandId, brand.name AS brandName, model.id AS modelId, model.name AS modelName, model.plug_type AS modelPlugType
     FROM brand
     JOIN model ON brand.id = model.brand_id`
    );

    // Initialisez un objet pour regrouper les marques et leurs modèles
    const brands = {};

    // Parcourez chaque ligne de résultat pour regrouper les modèles sous la marque correspondante
    rows.forEach((row) => {
      const { brandId, brandName, modelId, modelName, modelPlugType } = row;

      // Si la marque n'existe pas encore dans l'objet, ajoutez-la
      if (!brands[brandId]) {
        brands[brandId] = {
          id: brandId,
          name: brandName,
          models: [],
        };
      }

      // Ajoutez le modèle à la liste des modèles de la marque
      brands[brandId].models.push({
        id: modelId,
        name: modelName,
        plug_type: modelPlugType,
      });
    });

    // Retournez les marques sous forme de tableau
    return Object.values(brands);
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing brand

  // async update(brand) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an brand by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = BrandRepository;
