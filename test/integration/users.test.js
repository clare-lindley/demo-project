const { User } = require("../../src/models/user.model");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../../src/app");

describe("api/users", () => {
	beforeEach(async () => {
		await User.deleteMany();
	});

	describe("GET /", () => {
		it("should return all users", async () => {

			// Arrange
			const users = [
				{ name: "test", email: "test@gmail.com", gender: "male" },
				{ name: "test1", email: "test1@gmail.com", gender: "female" }
			];
			await User.insertMany(users);

			// Act
			const res = await request(app).get("/api/users");

			// Assert
			expect(res.status).to.equal(200);
			expect(res.body.length).to.equal(2);
		});
	});

	describe("GET /:id", () => {
		it("should return a user for the given id", async () => {

			// Arrange
			const user = { name: "test", email: "test@gmail.com", gender: "male" };
			let newUser = await User.create(user);
			let newUserId = newUser._id.toString();

			// Act
			const res = await request(app).get(`/api/users/${newUserId}`);

			// Assert
			expect(res.status).to.equal(200);
			expect(res.body._id).to.equal(newUserId);

		});

		it("should return 400 error when invalid object id is passed", async () => {
			const res = await request(app).get("/api/users/1");
			expect(res.status).to.equal(400);
		});

		it("should return 404 error when valid object id is passed but does not exist", async () => {
			const res = await request(app).get("/api/users/111111111111");
			expect(res.status).to.equal(404);
		});

	});

	describe("POST /", () => {
		it("should create a new user", async () => {

			// Arrange
			let newUser = {
				name: "test",
				email: "test@gmail.com",
				gender: "male"
			}

			// Act
			const res = await request(app).post("/api/users").send(newUser);

			// Assert
			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("_id");
			expect(res.body).to.have.property("name", "test");
		});
	});

	afterEach(async () => {
		await User.deleteMany();
	});

});
