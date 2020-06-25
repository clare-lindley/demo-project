const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const app_constants = require("../../src/lib/constants");
const { verifyToken } = require("../../src/lib/verify-token");

describe("Middleware Functions", () => {

	describe("verifyToken", () => {

		let verifyStub = sinon.stub(jwt, "verify");

		it("should call next() if authorization header is present and valid", () => {

			// Arrange
			let req = {
				headers: {
					authorization: "Bearer JWT-TOKEN"
				}
			};
			let res = {
				status: sinon.stub().returns({ send: sinon.spy() })
			};
			let next = sinon.stub();
			let auth_header = req.headers.authorization;
			let token = auth_header.split(" ")[1];
			verifyStub.returns("successful payload");

			// Act
			verifyToken(req, res, next);

			// Assert
			sinon.assert.calledWith(jwt.verify, token, app_constants.SECRET);
			sinon.assert.calledOnce(next);

		});

		it("should return 403 and an error message if authorization header is not present", () => {

			// Arrange
			let req = {
				headers: {}
			};
			let res = {
				status: sinon.stub().returns({ send: sinon.spy() })
			};
			let next = sinon.stub();

			// Act
			verifyToken(req, res, next);

			// Assert
			sinon.assert.calledWith(res.status, 403);
			sinon.assert.calledWith(res.status(403).send, app_constants.UNAUTHORISED_MSG);

		});

		it("should return 401 if token is present but cannot be verified", () => {

			// Arrange
			let req = {
				headers: {
					authorization: "Bearer JWT-TOKEN"
				}
			};
			let res = {
				status: sinon.stub().returns({ send: sinon.spy() })
			};
			let next = sinon.stub();

			verifyStub.throws(new Error("Test Error Message"));

			// Act
			verifyToken(req, res, next);

			// Assert
			sinon.assert.calledWith(res.status, 401);
			sinon.assert.calledWith(res.status(401).send, app_constants.INVALID_TOKEN_MSG);

		});

	});

});
