const Service = require("service");
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
					return Service.actions.health.bind(context)().then(result => {
						expect(result).toEqual({foo: "bar"});
					});
				});
		});
	});
});
