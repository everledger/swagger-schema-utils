#!/usr/bin/env node
/**
 * Command-line interface for schema formatting / exporting utilities.
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-12-21
 * @flow
 */

import fs from 'fs';
import { resolveRefs } from 'json-refs';
import YAML from 'yaml-js';

import loadSchema from './loadSchema';

const argv = require('yargs')
  .usage('Usage: $0 -e [export-path] -f [model-filter] -s [schema-path]')
  .demand(['s'])
  .alias('e', 'export-path')
  .describe('e', 'Destination file path when exporting normalised schemas.')
  .alias('f', 'model-filter')
  .describe('f', 'A particular model from #definitions can be extracted separately by specifying its name here.')
  .alias('s', 'schema-path')
  .describe('s', 'Path to the root-level origin schema file to process.')
  .argv;

const exportPath = argv.e;
const modelFilter = argv.f;
const schemaPath = argv.s;

function lazyError(e) {
  console.error(require('util').inspect(e, { colors: true, depth: null }));
  process.exit(1);
}

async function main() {
  let schema;
  try {
    schema = await loadSchema(schemaPath);
  } catch (e) {
    lazyError(e);
  }

  if (!modelFilter) {
    fs.writeFileSync(exportPath, YAML.dump(schema));
  } else {
    // bring in local refs first
    let withLocals;
    try {
      withLocals = await resolveRefs(schema, { filter: ['local'] });
    } catch (e) {
      lazyError(e);
    }
    const expandedSchema = (withLocals).resolved;
    fs.writeFileSync(exportPath, YAML.dump(expandedSchema.definitions[modelFilter]));
  }

  console.log(`Successfully exported to ${exportPath}`);
}

main();
