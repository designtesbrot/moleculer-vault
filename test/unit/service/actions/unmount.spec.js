const action = require("service").actions.unmount;
describe("Service", () => {
	describe("actions", () => {
		describe("unmount", () => {
			describe("params", () => {
				it("validates against a well defined schema", () => {
					expect(action.params).toEqual({
						mount_point: {type: "string"},
					});
				});
			});
			describe("handler", () => {
				it("resolves with the Vault unmount", () => {
					let context = {
						vault: {
							unmount: jest.fn().
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
							unmount: jest.fn().
								mockReturnValue(Promise.resolve({foo: "bar"})),
						},
					};
					const params = {
						mount_point: "foo"
					};
					return action.handler.bind(context)({params}).
						then(result => {
							expect(result).toEqual({foo: "bar"});
							expect(context.vault.unmount.mock.calls[0]).toEqual([
								{
									mount_point: "foo"
								}]);
						});
				});
				it("rejects with the Vault errors", () => {
					let context = {
						vault: {
							unmount: jest.fn().
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
