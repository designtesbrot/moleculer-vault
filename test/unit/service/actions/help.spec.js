const action = require("service").actions.help;
describe("Service", () => {
	describe("actions", () => {
		describe("help", () => {
			describe("params", () => {
				it("validates against a well defined schema", () => {
					expect(action.params).toEqual({
						path: {type: "string"},
						requestOptions: {type: "object", optional: true},
					});
				});
			});
			describe("handler", () => {
				it("resolves with the Vault help", () => {
					let context = {
						vault: {
							help: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					const params = {
						path: "foo",
						requestOptions: {foo: "bar"},
					};
					return action.handler.bind(context)({params}).
						then(result => {
							expect(context.vault.help.mock.calls[0]).
								toEqual([params.path, params.requestOptions]);
							expect(result).toEqual({foo: "bar"});
						});
				});
				it("rejects with the Vault errors", () => {
					let context = {
						vault: {
							help: jest.fn().
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
