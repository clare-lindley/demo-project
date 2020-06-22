const sinon = require('sinon');

const { createUser } = require("../../src/controllers/user.controller");
const { User } = require("../../src/models/user.model");

describe("User Controllers", () => {

	describe("createUser", () => {
		it("should successfully create a new user", async () => {

			// Arrange
			let req = {
				body: {
					name: 'testymctestface',
					email: 'testy@test.com',
					gender: 'alien'
				}
			};
			let res = {
				send: sinon.stub()
			};

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

			sinon.stub(User, 'create').resolves(newUser);

			// Act
			await createUser(req, res);

			// Assert
			sinon.assert.calledWith(User.create, rawUserData);
			sinon.assert.calledWith(res.send, newUser);

		});

		// it should handle errors and return the error status code and error message
		// make the create stub promise reject and expect to return 500
	});

});
