const Vault = require("node-vault");
const {defaultTo, add, prop, equals, mergeDeepRight} = require("ramda");
const {VaultInitializationError} = require("./errors");
const {throwVaultError} = require("./helpers");

/**
 * Service mixin to manage vault
 *
 * @name moleculer-vault
 * @module Service
 */
module.exports = {
	// Service name
	name: "vault",

	// Default settings
	settings: {
		/** @type {String} Which API Version of the Vault to use. */
		apiVersion: "v1",
		/** @type {String} Where to find the Vault. */
		endpoint: "http://127.0.0.1:8200",
		/** @type {String?} Which token to use for authenticating against the Vault */
		token: undefined,
		/** @type {Number} When starting, the service will connect to the Vault. When the Vault is not initialized, it will by default request the initialization status up to 5 times */
		waitForInitializationAttempts: 5,
		/** @type {Number} When starting, the service will connect to the Vault. When the Vault is not initialized, it will by wait for 1 second before requesting the initialization status again*/
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

	/**
	 * Interact with the Vault
	 */
	actions: {
		/**
		 * Obtain the Vaults Health.
		 *
		 * @actions
		 *
		 * @returns {Object} The Vaults Health Status.
		 */
		health: {
			params: {},
			handler(ctx) {
				return this.vault.health(ctx.params).catch(throwVaultError);
			},
		},
		/**
		 * Obtain all mounts of the Vault
		 *
		 * @actions
		 *
		 * @returns {Array<Object>}
		 */
		mounts: {
			params: {},
			handler(ctx) {
				return this.vault.mounts(ctx.params).catch(throwVaultError);
			},
		},
		/**
		 * Mount a new secret store at a given path
		 *
		 * @actions
		 *
		 * @param {String} mount_point - Specifies the path where the secrets engine will be mounted.
		 * @param {String} type - Specifies the type of the backend, such as "aws".
		 * @param {String?} description - Specifies the human-friendly description of the mount.
		 * @param {Object?} config - Specifies configuration options for this mount.
		 * @param {Object?} options - Specifies mount type specific options that are passed to the backend.
		 * @param {Boolean?} [local=false] - ENTERPRISE ONLY: Specifies if the secrets engine is a local mount only. Local mounts are not replicated nor (if a secondary) removed by replication.
		 * @param {Boolean?} [seal_wrap=false] - ENTERPRISE ONLY: Enable seal wrapping for the mount.
		 *
		 * @returns {undefined}
		 */
		mount: {
			params: {
				mount_point: {type: "string"},
				type: {type: "string"},
				description: {type: "string", optional: true},
				config: {
					type: "object",
					optional: true,
					props: {
						// The default lease duration, specified as a string duration
						// like "5s" or "30m".
						default_lease_ttl: {type: "string", optional: true},
						// The maximum lease duration, specified as a string duration
						// like "5s" or "30m".
						max_lease_ttl: {type: "string", optional: true},
						// Disable caching.
						force_no_cache: {type: "boolean", optional: true},
						// The name of the plugin in the plugin catalog to use.
						plugin_name: {type: "string", optional: true},
					},
				},
				options: {type: "object", optional: true},
				local: {type: "boolean", optional: true},
				seal_wrap: {type: "boolean", optional: true},

			},
			handler(ctx) {
				return Promise.resolve(ctx.params).
					then(defaultTo({})).
					then(mergeDeepRight({
						description: "",
						config: {
							default_lease_ttl: 0,
							force_no_cache: false,
							max_lease_ttl: 0,
							plugin_name: "",
						},
						local: false,
						options: {},
						seal_wrap: false,
					})).
					then(params => this.vault.mount(params)).
					catch(throwVaultError);
			},
		},
		/**
		 * Remount a mount to a different Path
		 *
		 * @actions
		 *
		 * @param {String} from - Specifies the previous mount point.
		 * @param {String} to - Specifies the new destination mount point.
		 *
		 * @returns {undefined}
		 */
		remount: {
			params: {
				from: {type: "string"},
				to: {type: "string"},
			},
			handler(ctx) {
				return Promise.resolve(ctx.params).
					then(defaultTo({})).
					then(params => this.vault.remount(params)).
					catch(throwVaultError);
			},
		},
		/**
		 * Unmount a mount from a path
		 *
		 * @actions
		 *
		 * @param {String} mount_point - Specifies the path where the secrets engine will be mounted.
		 *
		 * @returns {undefined}
		 */
		unmount: {
			params: {
				mount_point: {type: "string"},
			},
			handler(ctx) {
				return Promise.resolve(ctx.params).
					then(params => this.vault.unmount(params)).
					catch(throwVaultError);
			},
		}
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

	examples: [],
};
