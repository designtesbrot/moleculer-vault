const action = require("service").actions.mount;
describe("Service", () => {
	describe("actions", () => {
		describe("mount", () => {
			describe("params", () => {
				it("validates against a well defined schema", () => {
					expect(action.params).toEqual({
						mount_point: {type: "string"},
						type: {type: "string"},
						description: {type: "string", optional: true},
						config: {
							type: "object",
							optional: true,
							props: {
								default_lease_ttl: {
									type: "string",
									optional: true,
								},
								max_lease_ttl: {
									type: "string",
									optional: true,
								},
								force_no_cache: {
									type: "boolean",
									optional: true,
								},
								plugin_name: {
									type: "string",
									optional: true,
								},
							},
						},
						options: {type: "object", optional: true},
						local: {type: "boolean", optional: true},
						seal_wrap: {type: "boolean", optional: true},
					});
				});
			});
			describe("handler", () => {
				it("resolves with the Vault response", () => {
					let context = {
						vault: {
							mount: jest.fn().
								mockReturnValue(
									Promise.resolve({foo: "bar"})),
						},
					};
					return action.handler.bind(context)({}).
						then(result => {
							expect(result).toEqual({foo: "bar"});
							expect(context.vault.mount.mock.calls[0]).toEqual([
								{
									description: "",
									config: {
										default_lease_ttl: 0,
										force_no_cache: false,
										max_lease_ttl: 0,
										plugin_name: "",
									},
									local: false,
									options: {},
									seal_wrap: false,
								}]);
						});
				});

				it("uses parameters for mounting", () => {
					let context = {
						vault: {
							mount: jest.fn().
								mockReturnValue(
									Promise.resolve({foo: "bar"})),
						},
					};
					const params = {
						description: "foobar",
						config: {
							default_lease_ttl: 3,
							force_no_cache: true,
							max_lease_ttl: 5,
							plugin_name: "my_plugin",
						},
						local: true,
						options: {foo: "bar"},
						seal_wrap: true,
					};
					return action.handler.bind(context)({params}).
						then(result => {
							expect(result).toEqual({foo: "bar"});
							expect(context.vault.mount.mock.calls[0]).toEqual([
								{
									description: "foobar",
									config: {
										default_lease_ttl: 3,
										force_no_cache: true,
										max_lease_ttl: 5,
										plugin_name: "my_plugin",
									},
									local: true,
									options: {foo: "bar"},
									seal_wrap: true,
								}]);
						});
				});

				it("rejects with Vault Errors", () => {
					let context = {
						vault: {
							mount: jest.fn().
								mockReturnValue(Promise.reject(
									new Error("Something went wrong"))),
						},
					};
					return action.handler.bind(context)({}).catch(e => {
						expect(e.constructor.name).toEqual("VaultError");
					});
				});
			});
		});
	});
});
