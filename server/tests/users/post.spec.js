// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the POST /api/auth route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/auths", () => {
  it("should add a new item successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake item data
    const fakeItem = {
      avatar: "https://avatar.iran.liara.run/public/12",
      email: "test@test.com",
      birthday: "26-05-1998",
      password: "Azerty123@",
      firstname: "Simon",
      lastname: "Beget",
      address: "2 Place Bellecour",
      zip_code: "69000",
      city: "Lyon",
      // Data for car table
      name: "Titine",
      image: `https://avatar.iran.liara.run/username?username=titine`,
      model_id: 2,
    };

    // Send a POST request to the /api/auth endpoint with a test item
    const response = await request(app)
      .post("/api/auths/register")
      .send(fakeItem);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});
