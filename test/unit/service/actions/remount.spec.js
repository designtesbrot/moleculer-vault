const action = require("service").actions.remount;
describe("Service", () => {
	describe("actions", () => {
		describe("remount", () => {
			describe("params", () => {
				it("validates against a well defined schema", () => {
					expect(action.params).toEqual({
						from: {type: "string"},
						to: {type: "string"},
					});
				});
			});
			describe("handler", () => {
				it("resolves with the Vault remount", () => {
					let context = {
						vault: {
							remount: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					return action.handler.bind(context)({}).
						then(result => {
							expect(result).toEqual({foo: "bar"});
						});
				});
				it("uses parameters for mounting", () => {
					let context = {
						vault: {
							remount: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					const params = {
						from: "foo",
						to: "bar",
					};
					return action.handler.bind(context)({params}).
						then(result => {
							expect(result).toEqual({foo: "bar"});
							expect(context.vault.remount.mock.calls[0]).toEqual([
								{
									from: "foo",
									to: "bar",
								}]);
						});
				});
				it("rejects with the Vault errors", () => {
					let context = {
						vault: {
							remount: jest.fn().
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
});
