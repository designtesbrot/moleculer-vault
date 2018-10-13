[![Moleculer logo](http://moleculer.services/images/banner.png)](https://github.com/moleculerjs/moleculer)

[![Build Status](https://travis-ci.com/designtesbrot/moleculer-vault.svg?branch=master)](https://travis-ci.com/designtesbrot/moleculer-vault)
[![Coverage Status](https://coveralls.io/repos/github/designtesbrot/moleculer-vault/badge.svg?branch=master)](https://coveralls.io/github/designtesbrot/moleculer-vault?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eebf58adbe2c4d21b274092a802191da)](https://www.codacy.com/app/designtesbrot/moleculer-vault?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=designtesbrot/moleculer-vault&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/df5f0f2c69ec9361d793/maintainability)](https://codeclimate.com/github/designtesbrot/moleculer-vault/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/designtesbrot/moleculer-vault/badge.svg)](https://snyk.io/test/github/designtesbrot/moleculer-vault)

# Vault Service for the Moleculer framework

This Services provides actions for communicating with a [Vault Server](https://www.vaultproject.io/). Vault is a tool for 
securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, 
or certificates. Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.
The goal of this package is to provide actions for accessing and managing secrets using a connected vault server.

## Features

The following List details which features are implemented

- [X] Connect to the Vault on startup
- [X] Obtain the health status of the Vault

## Roadmap

The following List details which features will potentially be implemented

- [ ] Write, Read and Delete Secrets from the Vault
- [ ] Seal and Unseal the Vault
- [ ] Audit Management
- [ ] Auth Management
- [ ] Policy Management
- [ ] Mount Management

## Install

This package is not yet published to npm. In order to use it anyways, you can directly install it from github:

```bash
npm install designtesbrot/moleculer-vault
```

Once the package includes substantial API Coverage, it will be published to npm

## Usage

To make use of this Service, simply require it and create a new service:

```js
let { ServiceBroker } = require("moleculer");
let VaultService = require("moleculer-vault");

let broker = new ServiceBroker({ logger: console });

// Create a service
broker.createService({
    mixins: VaultService,
    settings: {
    	endpoint: "http://my-vault:8200",
    }
});

// Start server
broker.start().then(() => broker.call('vault.health'));
```

For a more indepth example checkout out the `examples folder`. It includes a docker-compose file, running `docker-compose up` will boot a broker with a vault service and a vault server.
All vault service actions are exposed on the API (which you should never do in real live!!!). You can run `curl http://localhost:3000/vault/health` for example.
This project includes a [published postman collection](https://documenter.getpostman.com/view/5523754/RWgrxHjg) enabling you to quickly explore the service in your local environment.

## Settings

The service can be configured using the settings Object:

```javascript
const settings = {
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
}

```

## API Documentation

# Actions

## `health` 

Obtain the health status of the connected vault server

### Parameters
none

### Results
**Type:** `<Object>`

```json
{
    "initialized": true,
    "sealed": false,
    "standby": false,
    "performance_standby": false,
    "replication_performance_mode": "disabled",
    "replication_dr_mode": "disabled",
    "server_time_utc": 1539428284,
    "version": "0.11.3",
    "cluster_name": "vault-cluster-3fa65bd5",
    "cluster_id": "73610ecc-d439-36c5-139a-3b44bd2ffd52"
}
```

## Test
```
$ docker-compose exec package yarn test
```

In development with watching

```
$ docker-compose up
```

## License
moleculer-vault is available under the [MIT license](https://tldrlegal.com/license/mit-license).
