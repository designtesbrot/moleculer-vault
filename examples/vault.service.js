const VaultService = Object.assign({}, require("./.."), {
	settings: {
		endpoint: "http://vault:8200",
		token: "pssst",
	},
});

// Load API Gateway
module.exports = {
	mixins: VaultService,
};
