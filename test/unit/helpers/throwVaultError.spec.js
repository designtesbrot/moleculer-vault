const {throwVaultError} = require("helpers");

describe("helpers", () => {
	describe("throwVaultError", () => {
		it("throws a Vault Error", () => {
			try {
				let error = new Error("Something went wrong");
				throwVaultError(error);
			}
			catch (e) {
				expect(e.constructor.name).toEqual("VaultError");
				expect(e.message).toEqual("Something went wrong");
				expect(e.code).toEqual(500);
				expect(e.type).toEqual("VAULT_ERROR");
				expect(e.data).toEqual({});
			}
		});

		it("throws a Vault Error including statusCode and response body",
			() => {
				try {
					let error = new Error("Something went wrong");
					error.response = {
						statusCode: 515,
						body: {
							foo: "bar",
						},
					};
					throwVaultError(error);
				}
				catch (e) {
					expect(e.constructor.name).toEqual("VaultError");
					expect(e.message).toEqual("Something went wrong");
					expect(e.code).toEqual(515);
					expect(e.type).toEqual("VAULT_ERROR");
					expect(e.data).toEqual({
						foo: "bar",
					});
				}
			});
	});
});
