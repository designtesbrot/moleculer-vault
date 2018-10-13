const Vault = require("node-vault");
const {defaultTo, add, prop, equals} = require("ramda");
const {VaultInitializationError} = require("./errors");

module.exports = {
	// Service name
	name: "vault",

	// Default settings
	settings: {
		// Which API Version of the Vault to use
		apiVersion: "v1",
		// Where to find the Vault
		endpoint: "http://127.0.0.1:8200",
		// Which token to use for authenticating against the Vault
		token: undefined,
		// When starting, the service will connect to the Vault. When the Vault
		// is not initialized, it will by default request the initialization
		// status up to 5 times
		waitForInitializationAttempts: 5,
		// When starting, the service will connect to the Vault. When the Vault
		// is not initialized, it will by wait for 1 second before requesting
		// the initialization status again
		waitForInitializationInterval: 1000,
	},

	methods: {
		/**
		 * Returns a promise that resolves once the Vault has been initialized
		 * or rejects if the configured timeout was exceeded
		 *
		 * @param {{attempt: Number}} options
		 * @returns {PromiseLike<Number|VaultInitializationError>} Resolves with
		 *         the number of attempts that where required or rejects with a
		 *         VaultInitializationError
		 */
		waitForInitialization(options = {}) {
			return this.Promise.resolve(options.attempt).
				// attempts defaults to 0
				then(defaultTo(0)).
				// add +1 to attempts
				then(add(1)).
				// when the maximum attempts has been exceeded, throw
				then(attempt => attempt - 1 >
				this.settings.waitForInitializationAttempts
					? (() => {
						throw new VaultInitializationError(undefined, undefined,
							undefined, {attempt: attempt - 2});
					})()
					: attempt).
				then(attempt =>
					// check if the vault is initialized
					this.vault.initialized().
						then(prop("initialized")).
						// if initialized, resolve
						then(initialized => equals(true)(initialized)
							? this.Promise.resolve(attempt) :
							// else, delay for the configured interval and try
							// again
							this.Promise.delay(
								this.settings.waitForInitializationInterval).
								then(() => this.waitForInitialization(
									{attempt}))));
		},
	},

	actions: {
		/**
		 * Returns the health of the Vault
		 *
		 * @returns {Promise.<{initialized: boolean}>}
		 */
		health() {
			return this.vault.health();
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		this.vault = Vault(this.settings);
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {
		return this.waitForInitialization().
			then(attempts => this.logger.info(
				`Connected to vault after ${attempts} attempts`));
	},
};
