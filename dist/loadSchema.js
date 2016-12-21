'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resolveExternalRefs = require('./resolveExternalRefs');

var _resolveExternalRefs2 = _interopRequireDefault(_resolveExternalRefs);

var _expandSubschemaAttrs = require('./expandSubschemaAttrs');

var _expandSubschemaAttrs2 = _interopRequireDefault(_expandSubschemaAttrs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loads up a Swagger schema from disk and correctly resolves all references
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-11-01
 * 
 */

var loadSchema = function loadSchema(filePath) {
  return (0, _resolveExternalRefs2.default)(filePath).then(function (schema) {
    return (0, _expandSubschemaAttrs2.default)(schema);
  });
};

exports.default = loadSchema;
//# sourceMappingURL=loadSchema.js.map