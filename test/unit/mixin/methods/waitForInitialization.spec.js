const Service = require("service");
const Promise = require("bluebird");
describe("Service", () => {
	describe("methods", () => {
		describe("waitForInitialization", () => {
			it("resolves whe the vault is initialized", () => {
				let context = {
					vault: {
						initialized: jest.fn().
							mockReturnValueOnce(
								Promise.resolve({initialized: true})),
					},
					Promise,
					methods: {},
					settings: {
						waitForInitializationAttempts: 2,
						waitForInitializationInterval: 10,
					},
				};
				// enable recursive calls while maintaining bound context
				context.waitForInitialization = Service.methods.waitForInitialization.bind(
					context);
				return Service.methods.waitForInitialization.bind(context)().
					then(result => {
						expect(result).toEqual(1);
					});
			});

			it("requests initialization status again, when the vault is not initialized and maximum number of attempts have not been exceeded",
				() => {
					let context = {
						vault: {
							initialized: jest.fn().
								mockReturnValueOnce(
									Promise.resolve({initialized: false})).
								mockReturnValueOnce(
									Promise.resolve({initialized: true})),
						},
						Promise,
						methods: {},
						settings: {
							waitForInitializationAttempts: 2,
							waitForInitializationInterval: 10,
						},
					};
					// enable recursive calls while maintaining bound context
					context.waitForInitialization = Service.methods.waitForInitialization.bind(
						context);
					return Service.methods.waitForInitialization.bind(context)().
						then(result => {
							expect(result).toEqual(2);
						});
				});

			it("rejects if the maximum number of attempts have been exceeded",
				() => {
					let context = {
						vault: {
							initialized: jest.fn().
								mockReturnValue(
									Promise.resolve({initialized: false})),
						},
						Promise,
						methods: {},
						settings: {
							waitForInitializationAttempts: 2,
							waitForInitializationInterval: 10,
						},
					};
					context.waitForInitialization = Service.methods.waitForInitialization.bind(
						context);
					return Service.methods.waitForInitialization.bind(context)().
						then(() => {
							expect(true).toEqual(false);
						}).
						catch(e => {
							expect(e.constructor.name).toEqual("VaultInitializationError");
							expect(e.data.attempt).toEqual(2);
						});
				});
		});
	});
});
