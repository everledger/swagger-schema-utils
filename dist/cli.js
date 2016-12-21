#!/usr/bin/env node
'use strict';

var _nodentRuntime = require('nodent-runtime');

var _nodentRuntime2 = _interopRequireDefault(_nodentRuntime);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var schema, expandedSchema;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _loadSchema2.default)(schemaPath);

          case 2:
            schema = _context.sent;

            if (modelFilter) {
              _context.next = 7;
              break;
            }

            _fs2.default.writeFileSync(exportPath, _yamlJs2.default.dump(schema));
            _context.next = 11;
            break;

          case 7:
            _context.next = 9;
            return (0, _jsonRefs.resolveRefs)(schema, { filter: ['local'] });

          case 9:
            expandedSchema = _context.sent.resolved;

            _fs2.default.writeFileSync(exportPath, _yamlJs2.default.dump(expandedSchema.definitions[modelFilter]));

          case 11:

            console.log('Successfully exported to ' + exportPath);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonRefs = require('json-refs');

var _yamlJs = require('yaml-js');

var _yamlJs2 = _interopRequireDefault(_yamlJs);

var _loadSchema = require('./loadSchema');

var _loadSchema2 = _interopRequireDefault(_loadSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Command-line interface for schema formatting / exporting utilities.
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-12-21
 * 
 */

var argv = require('yargs').usage('Usage: $0 -e [export-path] -f [model-filter] -s [schema-path]').demand(['s']).alias('e', 'export-path').describe('e', 'Destination file path when exporting normalised schemas.').alias('f', 'model-filter').describe('f', 'A particular model from #definitions can be extracted separately by specifying its name here.').alias('s', 'schema-path').describe('s', 'Path to the root-level origin schema file to process.').argv;

var exportPath = argv.e;
var modelFilter = argv.f;
var schemaPath = argv.s;

main();
//# sourceMappingURL=cli.js.map