const Service = require("service");
describe("Service", () => {
	describe("created", () => {
		it("creates a vault instance", () => {
			let context = {};
			Service.created.bind(context)();
			expect(context.vault.constructor.name).toEqual("Object");
		});
	});
});
