const { app, request } = require("../config");

describe("Controlled inputs after POST on auths/register", () => {
  it("should not register a new user if email is invalid", async () => {
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

    expect(response.status).toBe(201);
  });
});
