const action = require("service").actions.mounts;
describe("Service", () => {
	describe("actions", () => {
		describe("mounts", () => {
			it("resolves with the Vault mounts", () => {
				let context = {
					vault: {
						mounts: jest.fn().
							mockReturnValue(Promise.resolve({foo: "bar"})),
					},
				};
				return action.handler.bind(context)({}).
					then(result => {
						expect(result).toEqual({foo: "bar"});
					});
			});
			it("rejects with the Vault errors", () => {
				let context = {
					vault: {
						mounts: jest.fn().
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
