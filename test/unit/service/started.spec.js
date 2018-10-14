const Service = require("service");
describe("Service", () => {
	describe("started", () => {
		it("waits for initialization, logs an info statement and resolves",
			() => {
				let context = {
					waitForInitialization: jest.fn().
						mockReturnValue(Promise.resolve(3)),
					logger: {
						info: jest.fn(),
					},
				};
				return Service.started.bind(context)().then(() => {
					expect(context.logger.info.mock.calls[0]).
						toEqual(["Connected to vault after 3 attempts"]);
				});
			});
	});
});
