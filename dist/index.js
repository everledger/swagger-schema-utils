'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandSubschemaAttrs = exports.resolveExternalRefs = exports.loadSchema = undefined;

var _loadSchema2 = require('./loadSchema');

var _loadSchema3 = _interopRequireDefault(_loadSchema2);

var _resolveExternalRefs2 = require('./resolveExternalRefs');

var _resolveExternalRefs3 = _interopRequireDefault(_resolveExternalRefs2);

var _expandSubschemaAttrs2 = require('./expandSubschemaAttrs');

var _expandSubschemaAttrs3 = _interopRequireDefault(_expandSubschemaAttrs2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.loadSchema = _loadSchema3.default; /**
                                            * Toplevel module exports
                                            *
                                            * @package: swagger-schema-utils
                                            * @author:  pospi <sam@everledger.io>
                                            * @since:   2016-12-21
                                            * 
                                            */

exports.resolveExternalRefs = _resolveExternalRefs3.default;
exports.expandSubschemaAttrs = _expandSubschemaAttrs3.default;
//# sourceMappingURL=index.js.map