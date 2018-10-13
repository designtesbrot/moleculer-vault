const {MoleculerRetryableError} = require("moleculer/src/errors");

/**
 * Error that should be thrown when Vault did not respond as initialized during
 * the configured timespan
 *
 * @class VaultInitializationError
 * @extends {MoleculerRetryableError}
 */
module.exports = class VaultInitializationError extends MoleculerRetryableError {
	/**
	 * Creates an instance of VaultInitializationError.
	 *
	 * @param {String?} message
	 * @param {Number?} code
	 * @param {String?} type
	 * @param {any} data
	 *
	 * @memberof VaultInitializationError
	 */
	constructor(
		message = "Vault is not initialized", code = 503,
		type = "VAULT_INITIALIZATION_ERROR", data = {attempts: 5}) {
		super(message);
		this.code = code;
		this.type = type;
		this.data = data;
	}
};
