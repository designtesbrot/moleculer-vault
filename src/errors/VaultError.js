const {MoleculerError} = require("moleculer/src/errors");

/**
 * Error that should be thrown when Vault did not respond as initialized during
 * the configured timespan
 *
 * @class VaultError
 * @extends {MoleculerError}
 */
module.exports = class VaultError extends MoleculerError {
	/**
	 * Creates an instance of VaultError.
	 *
	 * @param {String?} message
	 * @param {Number?} code
	 * @param {String?} type
	 * @param {any} data
	 *
	 * @memberof VaultError
	 */
	constructor(
		message = "Vault encountered an error", code = 500,
		type = "VAULT_ERROR", data = {}) {
		super(message);
		this.code = code;
		this.type = type;
		this.data = data;
	}
};
