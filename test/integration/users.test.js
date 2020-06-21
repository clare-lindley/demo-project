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

	afterEach(async () => {
		await User.deleteMany();
	});

});
