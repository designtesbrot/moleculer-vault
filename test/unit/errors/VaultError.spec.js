const {VaultError} = require("errors");

describe("Errors", () => {
	describe("VaultError", () => {
		describe("constructor", () => {
			it("constructs with sensitive defaults", () => {
				let error = new VaultError();
				expect(error.message).toEqual("Vault encountered an error");
				expect(error.code).toEqual(500);
				expect(error.type).toEqual("VAULT_ERROR");
				expect(error.data).toEqual({});
				expect(error.retryable).toEqual(false);
			});

			it("constructs with given arguments", () => {
				let error = new VaultError("foo", 500, "BAR",
					{fooz: "barz"});
				expect(error.message).toEqual("foo");
				expect(error.code).toEqual(500);
				expect(error.type).toEqual("BAR");
				expect(error.data).toEqual({fooz: "barz"});
				expect(error.retryable).toEqual(false);
			});
		});
	});
});
