const { app, request, database } = require("../config");

describe("Controlled inputs after POST on auths/register", () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.resetAllMocks();
  });

  it("should not register a new user if email is invalid", async () => {
    // Mock la fonction de validation pour simuler une erreur
    jest.spyOn(database, "query").mockImplementation(() => Promise.resolve([]));

    const fakeItem = {
      avatar: "https://avatar.iran.liara.run/public/12",
      email: "invalid-email", // Invalide email pour tester l'erreur
      birthday: "1985-07-15",
      password: "weak",
      firstname: "Simon",
      lastname: "Beget",
      address: "2 Place Bellecour",
      zip_code: "69000",
      city: "Lyon",
      name: "Titine",
      image: `https://avatar.iran.liara.run/username?username=titine`,
      model_id: 2,
    };

    const response = await request(app)
      .post("/api/auths/register")
      .send(fakeItem);

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Erreur d'email 🤔");
  });

  it("should not register a new user if password is invalid", async () => {
    // Mock la fonction de validation pour simuler une erreur
    jest.spyOn(database, "query").mockImplementation(() => Promise.resolve([]));

    const fakeItem = {
      avatar: "https://avatar.iran.liara.run/public/12",
      email: "test@testo.fr",
      birthday: "1985-07-15",
      password: "weak", // Mot de passe faible pour tester les validations
      firstname: "Simon",
      lastname: "Beget",
      address: "2 Place Bellecour",
      zip_code: "69000",
      city: "Lyon",
      name: "Titine",
      image: `https://avatar.iran.liara.run/username?username=titine`,
      model_id: 2,
    };

    const response = await request(app)
      .post("/api/auths/register")
      .send(fakeItem);

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Il manque une lettre majuscule. 🙃");
  });

  it("should register a new user if data is valid", async () => {
    // Mock la fonction de base de données pour simuler une insertion réussie
    jest
      .spyOn(database, "query")
      .mockImplementation(() => Promise.resolve([{ insertId: 1 }]));

    const fakeItem = {
      avatar: "https://avatar.iran.liara.run/public/12",
      email: "test@test.com",
      birthday: "1985-07-15",
      password: "ValidPass123!", // Mot de passe fort
      firstname: "Simon",
      lastname: "Beget",
      address: "2 Place Bellecour",
      zip_code: "69000",
      city: "Lyon",
      name: "Titine",
      image: `https://avatar.iran.liara.run/username?username=titine`,
      model_id: 2,
    };

    const response = await request(app)
      .post("/api/auths/register")
      .send(fakeItem);

    // Assertions
    expect(response.status).toBe(201);
  });
});
