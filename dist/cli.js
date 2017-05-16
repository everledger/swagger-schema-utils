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
    var schema, withLocals, expandedSchema;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            schema = void 0;
            _context.prev = 1;
            _context.next = 4;
            return (0, _loadSchema2.default)(schemaPath);

          case 4:
            schema = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            lazyError(_context.t0);

          case 10:
            if (modelFilter) {
              _context.next = 14;
              break;
            }

            _fs2.default.writeFileSync(exportPath, _yamlJs2.default.dump(schema));
            _context.next = 26;
            break;

          case 14:
            // bring in local refs first
            withLocals = void 0;
            _context.prev = 15;
            _context.next = 18;
            return (0, _jsonRefs.resolveRefs)(schema, { filter: ['local'] });

          case 18:
            withLocals = _context.sent;
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t1 = _context['catch'](15);

            lazyError(_context.t1);

          case 24:
            expandedSchema = withLocals.resolved;

            _fs2.default.writeFileSync(exportPath, _yamlJs2.default.dump(expandedSchema.definitions[modelFilter]));

          case 26:

            console.log('Successfully exported to ' + exportPath);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7], [15, 21]]);
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

function lazyError(e) {
  console.error(require('util').inspect(e, { colors: true, depth: null }));
  process.exit(1);
}

main();
//# sourceMappingURL=cli.js.map