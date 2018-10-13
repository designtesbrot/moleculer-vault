const {VaultInitializationError} = require("errors");

describe("Errors", () => {
	describe("VaultInitializationError", () => {
		describe("constructor", () => {
			it("constructs with sensitive defaults", () => {
				let error = new VaultInitializationError();
				expect(error.message).toEqual("Vault is not initialized");
				expect(error.code).toEqual(503);
				expect(error.type).toEqual("VAULT_INITIALIZATION_ERROR");
				expect(error.data).toEqual({attempts: 5});
				expect(error.retryable).toEqual(true);
			});

			it("constructs with given arguments", () => {
				let error = new VaultInitializationError("foo", 500, "BAR",
					{fooz: "barz"});
				expect(error.message).toEqual("foo");
				expect(error.code).toEqual(500);
				expect(error.type).toEqual("BAR");
				expect(error.data).toEqual({fooz: "barz"});
				expect(error.retryable).toEqual(true);
			});
		});
	});
});
