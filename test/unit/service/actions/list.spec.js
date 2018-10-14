const action = require("service").actions.list;
describe("Service", () => {
	describe("actions", () => {
		describe("list", () => {
			describe("params", () => {
				it("validates against a well defined schema", () => {
					expect(action.params).toEqual({
						path: {type: "string"},
						requestOptions: {type: "object", optional: true},
					});
				});
			});
			describe("handler", () => {
				it("resolves with the Vault list", () => {
					let context = {
						vault: {
							list: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					const params = {
						path: "foo",
						requestOptions: {foo: "bar"},
					};
					return action.handler.bind(context)({params}).
						then(result => {
							expect(context.vault.list.mock.calls[0]).
								toEqual([params.path, params.requestOptions]);
							expect(result).toEqual({foo: "bar"});
						});
				});
				it("rejects with the Vault errors", () => {
					let context = {
						vault: {
							list: jest.fn().
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
