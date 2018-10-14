-----------------------------
<a name="0.1.0"></a>
# 0.1.0 (2018-10-14)

## New

### Basic Secret Management
The service now supports generic read/write access to any Vault Backend, enabling basic secret management. The actions are:
* **write** - writes data to a Vault Path. The Postman collection now includes an example for writing a new Secret to a KV Backend
* **read** - reads data from a Vault Path. The Postman collection now includes an example for obtaining Secret from a KV Backend
* **delete** - deletes data from a Vault Path. The Postman collection now includes an example for deleting the latest Secret version from a KV Backend
* **list** - lists all secrets from a Vault Path. The Postman collection now includes an example for obtaining a list of all secrets from a KV Backend
* **help** - obtains help from the Vault Backend. Thanks HashiCorp

All actions allow for passing a `requestOptions` object to the underlying `request-promise-native` package performing the acutal reqeust. This allows for more advanced operations (like restoring a previously deleted secret).

-----------------------------

-----------------------------
<a name="0.0.1"></a>
# 0.0.1 (2018-10-14)

## New

### Basic Mount Management
The service now includes actions for Basic Mount Management, including:
* **mounts** - lists all Vault mounts 
* **mount** - Creates a new mount of a Vault Backend
* **unmount** - Removes a mount of a Vault Backend
* **remount** - Moves a Vault backend from one path to another

### Health Request
The service now includes a **health** action, which requests and returns health status of the configured Vault backend

-----------------------------
