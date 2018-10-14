const Service = require("service");
describe("Service", () => {
	describe("settings", () => {
		it("uses sensitive defaults", () => {
			expect(Service.settings).toEqual({
				apiVersion: "v1",
				endpoint: "http://127.0.0.1:8200",
				token: undefined,
				waitForInitializationAttempts: 5,
				waitForInitializationInterval: 1000,
			});
		});
	});
});
