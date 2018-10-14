const action = require("service").actions.write;
describe("Service", () => {
	describe("actions", () => {
		describe("write", () => {
			describe("params", () => {
				it("validates against a well defined schema", () => {
					expect(action.params).toEqual({
						path: {type: "string"},
						data: {type: "object"},
						requestOptions: {type: "object", optional: true},
					});
				});
			});
			describe("handler", () => {
				it("resolves with the Vault write", () => {
					let context = {
						vault: {
							write: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					const params = {
						path: "foo",
						data: {fooz: "barz"},
						requestOptions: {foo: "bar"},
					};
					return action.handler.bind(context)({params}).
						then(result => {
							expect(context.vault.write.mock.calls[0]).
								toEqual([
									params.path,
									params.data,
									params.requestOptions]);
							expect(result).toEqual({foo: "bar"});
						});
				});
				it("rejects with the Vault errors", () => {
					let context = {
						vault: {
							write: jest.fn().
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
