"use strict";

const sinon = require("sinon");

const { createUser } = require("../../src/controllers/user.controller");
const { User } = require("../../src/models/user.model");

describe("User Controllers", () => {

	describe("createUser", () => {

		let createUserStub;
		const req = {
			body: {
				name: "test",
				email: "testy@test.com",
				gender: "female"
			}
		};
		const res = {
			send: sinon.stub()
		};

		beforeEach(() => {
			createUserStub = sinon.stub(User, "create");
		});

		it("should successfully create a new user", async () => {

			// Arrange
			const rawUserData = {
				name: req.body.name,
				email: req.body.email,
				gender: req.body.gender
			};

			const newUser = {
				name: req.body.name,
				email: req.body.email,
				gender: req.body.gender
			};

			createUserStub.resolves(newUser);

			// Act
			await createUser(req, res);

			// Assert
			sinon.assert.calledWith(User.create, rawUserData);
			sinon.assert.calledWith(res.send, newUser);

		});

		it("should handle failures", async () => {

			// Arrange
			const testErrorMessage = "Test error message";
			createUserStub.rejects(new Error(testErrorMessage));

			// Act
			await createUser(req, res);

			// Assert
			sinon.assert.calledWith(res.send, testErrorMessage);

		});


		afterEach(() => {
			createUserStub.restore();
		});

	});

});
