const sinon = require('sinon');

const { createUser } = require("../../src/controllers/user.controller");
const { User } = require("../../src/models/user.model");

describe("User Controllers", () => {

	describe("createUser", () => {

		let createUserStub;
		let req = {
			body: {
				name: 'test',
				email: 'testy@test.com',
				gender: 'female'
			}
		};
		let res = {
			send: sinon.stub()
		};

		beforeEach(() => {
			createUserStub = sinon.stub(User, 'create');
		});

		it("should successfully create a new user", async () => {

			// Arrange
			let rawUserData = {
				name: req.body.name,
				email: req.body.email,
				gender: req.body.gender
			}

			let newUser = {
				name: req.body.name,
				email: req.body.email,
				gender: req.body.gender
			}

			createUserStub.resolves(newUser);

			// Act
			await createUser(req, res);

			// Assert
			sinon.assert.calledWith(User.create, rawUserData);
			sinon.assert.calledWith(res.send, newUser);

		});

		it("should handle failures", async () => {

			// Arrange
			let testErrorMessage = 'Test error message';
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
