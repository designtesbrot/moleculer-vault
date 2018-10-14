[![Moleculer logo](http://moleculer.services/images/banner.png)](https://github.com/moleculerjs/moleculer)

[![Build Status](https://travis-ci.com/designtesbrot/moleculer-vault.svg?branch=master)](https://travis-ci.com/designtesbrot/moleculer-vault)
[![Coverage Status](https://coveralls.io/repos/github/designtesbrot/moleculer-vault/badge.svg?branch=master)](https://coveralls.io/github/designtesbrot/moleculer-vault?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/eebf58adbe2c4d21b274092a802191da)](https://www.codacy.com/app/designtesbrot/moleculer-vault?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=designtesbrot/moleculer-vault&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/df5f0f2c69ec9361d793/maintainability)](https://codeclimate.com/github/designtesbrot/moleculer-vault/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/designtesbrot/moleculer-vault/badge.svg)](https://snyk.io/test/github/designtesbrot/moleculer-vault)
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3351a0953a3bfcf7b64a)

# Vault Service for the Moleculer framework

This Services provides actions for communicating with a [Vault Server](https://www.vaultproject.io/). Vault is a tool for 
securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, 
or certificates. Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.
The goal of this package is to provide actions for accessing and managing secrets using a connected vault server.

## Features

The following List details which features are implemented

- Connect to the Vault on startup
- Obtain the health status of the Vault
- Mount Management

## Roadmap

The following List details which features will potentially be implemented

- Write, Read and Delete Secrets from the Vault
- Seal and Unseal the Vault
- Audit Management
- Auth Management
- Policy Management

## Install

This package is not yet published to the npm-registry. In order to use it anyways, you can directly install it from github:

```bash
yarn add moleculer-vault
```

Once the package includes substantial API Coverage, it will be published to the npm-registry

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
This project includes a [published postman collection](https://app.getpostman.com/run-collection/3351a0953a3bfcf7b64a) enabling you to quickly explore the service in your local environment.

## Settings

<!-- AUTO-CONTENT-START:SETTINGS -->
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `apiVersion` | `String` | **required** | Which API Version of the Vault to use. |
| `endpoint` | `String` | **required** | Where to find the Vault. |
| `token` | `String` | `null` | Which token to use for authenticating against the Vault |
| `waitForInitializationAttempts` | `Number` | **required** | When starting, the service will connect to the Vault. When the Vault is not initialized, it will by default request the initialization status up to 5 times |
| `waitForInitializationInterval` | `Number` | **required** | When starting, the service will connect to the Vault. When the Vault is not initialized, it will by wait for 1 second before requesting the initialization status again |

<!-- AUTO-CONTENT-END:SETTINGS -->

<!-- AUTO-CONTENT-TEMPLATE:SETTINGS
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each this}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^this}}
*No settings.*
{{/this}}

-->

## Actions

<!-- AUTO-CONTENT-START:ACTIONS -->
## `health` 

Obtain the Vaults Health.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
*No input parameters.*

### Results
**Type:** `Object`

The Vaults Health Status.


## `mounts` 

Obtain all mounts of the Vault

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
*No input parameters.*

### Results
**Type:** `Array.<Object>`




## `mount` 

Mount a new secret store at a given path

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `mount_point` | `String` | **required** | Specifies the path where the secrets engine will be mounted. |
| `type` | `String` | **required** | Specifies the type of the backend, such as "aws". |
| `description` | `String` | - | Specifies the human-friendly description of the mount. |
| `config` | `Object` | - | Specifies configuration options for this mount. |
| `options` | `Object` | - | Specifies mount type specific options that are passed to the backend. |
| `local` | `Boolean` | `false` | ENTERPRISE ONLY: Specifies if the secrets engine is a local mount only. Local mounts are not replicated nor (if a secondary) removed by replication. |
| `seal_wrap` | `Boolean` | `false` | ENTERPRISE ONLY: Enable seal wrapping for the mount. |

### Results
**Type:** `undefined`




## `remount` 

Remount a mount to a different Path

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `from` | `String` | **required** | Specifies the previous mount point. |
| `to` | `String` | **required** | Specifies the new destination mount point. |

### Results
**Type:** `Object`

TODO


## `unmount` 

Unmount a mount from a path

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `mount_point` | `String` | **required** | Specifies the path where the secrets engine will be mounted. |

### Results
**Type:** `Object`

TODO


<!-- AUTO-CONTENT-END:ACTIONS -->

<!-- AUTO-CONTENT-TEMPLATE:ACTIONS
{{#each this}}
## `{{name}}` {{#each badges}}{{this}} {{/each}}
{{#since}}
_<sup>Since: {{this}}</sup>_
{{/since}}

{{description}}

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each params}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^params}}
*No input parameters.*
{{/params}}

{{#returns}}
### Results
**Type:** {{type}}

{{description}}
{{/returns}}

{{#hasExamples}}
### Examples
{{#each examples}}
{{this}}
{{/each}}
{{/hasExamples}}

{{/each}}
-->

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
