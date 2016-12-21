# swagger-schema-utils

Utilities for normalising and resolving complex (multi-file) [Swagger](http://swagger.io/) schemas.

<!-- MarkdownTOC -->

- [Rationale](#rationale)
- [Issues addressed](#issues-addressed)
	- [Bundling of external schema files](#bundling-of-external-schema-files)
	- [Use of `additionalProperties` with sub-schemas](#use-of-additionalproperties-with-sub-schemas)
- [Usage](#usage)
	- [Loading schemas](#loading-schemas)
	- [Using the CLI](#using-the-cli)
		- [Flattening schemas](#flattening-schemas)
		- [Exporting model schemas from `#definitions`](#exporting-model-schemas-from-definitions)
- [License](#license)

<!-- /MarkdownTOC -->



## Rationale

For complex APIs, a single Swagger file grows to an unmaintainable length over time. Worse still, authors are often forced to add a lot of duplicate configuration in order to create a working schema. This module allows decomposing your schemas into multiple source files and provides the necessary workarounds and tooling needed to integrate your schema with existing Swagger tooling.

Note that this module only works with the more user-friendly YAML schemas currently, though it would be simple enough to implement JSON ones in `resolveExternalRefs.js`.



## Issues addressed

### Bundling of external schema files

Since most Swagger libraries only deal with a single schema, the most important function this module performs is to resolve external references and inline them into the master schema. Other solutions are out there (eg. [swagger-parser](https://github.com/BigstickCarpet/swagger-parser)), but have quirks of their own when it comes to resolution order and module reuse.

Our resolver is dumb- it will *ALWAYS* load external schemas in at their mounted `$ref` location. For best results & smallest resulting schemas we recommend you load your externals in under `#/definitions/` and refer to them by their definition path in all other locations.

### Use of `additionalProperties` with sub-schemas

A [known issue](http://stackoverflow.com/a/23001194/141881) with JSON Schema Draft v4 is unnecessary verbosity when combining `additionalProperties: false` with `allOf` / `anyOf` etc in order to restrict the allowable input fields.

Our loading algorithm detects this for all models loaded under `#/definitions/`, and will create empty attribute definitions for all fields in sub-schemas up to the toplevel one. This workaround indicates to the JSON schema parser that _all_ attributes defined in child schemas should be allowed when other additional properites are not.




## Usage

### Loading schemas

Simply pass your schema file path to `loadSchema` and you'll get back a promise for a normalised, flattened version. In ES7, simply:

```
import { loadSchema } from 'swagger-schema-utils';

async function getMyAppSchema() {
	return await loadSchema('./path/to/schema.yaml');
}
```

In an ES6 or ES5 environment the function will return a promise that you can `.then()` and `.catch()` with as usual.

### Using the CLI

You may wish to export single-file schemas in order to integrate more easily with other systems or external users of your API. This module provides the `swagger-schema-utils` CLI command for performing these functions.

#### Flattening schemas

```
swagger-schema-utils -s {root_input_schema.yaml} -e {dest_file.yaml}
```

#### Exporting model schemas from `#definitions`

Simply add the `-f` flag, indicating the ID of the definition you wish to export.

```
swagger-schema-utils -s {root_input_schema.yaml} -f {definitionID} -e {dest_file.yaml}
```


## License

Made with :heart: at [Everledger.io](http://www.everledger.io/) and released under an MIT license.
