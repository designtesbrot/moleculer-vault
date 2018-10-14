const action = require("service").actions.health;
describe("Service", () => {
	describe("actions", () => {
		describe("health", () => {
			it("resolves with the Vault health",
				() => {
					let context = {
						vault: {
							health: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					return action.handler.bind(context)({}).
						then(result => {
							expect(result).toEqual({foo: "bar"});
						});
				});
			it("rejects with the Vault errors",
				() => {
					let context = {
						vault: {
							health: jest.fn().
								mockReturnValue(Promise.reject(new Error())),
						},
					};
					return action.handler.bind(context)({}).
						catch(e => {
							expect(e.constructor.name).toEqual("VaultError");
						});
				});
		});
	});
});
