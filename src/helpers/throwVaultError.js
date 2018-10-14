const {VaultError} = require("../errors");

module.exports = e => {
	throw new VaultError(e.message,
		e.response && e.response.statusCode ? e.response.statusCode : 500,
		undefined,
		e.response && e.response.body ? e.response.body : undefined);
};
