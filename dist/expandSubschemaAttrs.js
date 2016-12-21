'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _ramda = require('ramda');

var _swaggerParser = require('swagger-parser');

var _swaggerParser2 = _interopRequireDefault(_swaggerParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Expands all sub-schema attributes into empty attributes at the parent level
 * if `additionalProperties` is used in the parent schema.
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-11-01
 * 
 */

function mapObject(obj, cb) {
  var newObj = {};
  (0, _keys2.default)(obj).forEach(function (k) {
    newObj[k] = cb(obj[k], k, obj);
  });
  return newObj;
}

// @see http://stackoverflow.com/questions/22689900/ddg#23001194
var createToplevelProperties = (0, _ramda.curry)(function ($refs, def) {
  if (def.additionalProperties !== false) {
    return def;
  }

  var extras = (def.allOf || []).concat(def.anyOf || []).concat(def.oneOf || []);
  if (!extras.length) {
    return def;
  }

  def = (0, _extends3.default)({}, def); // clone before manipulating

  if (!def.properties) {
    def.properties = {};
  }

  extras.forEach(function (schema) {
    if (schema.properties) {
      (0, _keys2.default)(schema.properties).forEach(function (prop) {
        return def.properties[prop] = {};
      });
    }
    if (schema.$ref) {
      var reference = $refs.get($refs.paths()[0] + schema.$ref);
      if (reference.properties) {
        (0, _keys2.default)(reference.properties).forEach(function (prop) {
          return def.properties[prop] = {};
        });
      }
    }
  });

  return def;
});

var expandSubschemaProps = function expandSubschemaProps(schema) {
  schema = (0, _extends3.default)({}, schema); // clone before manipulating
  return _swaggerParser2.default.resolve(schema).then(function ($refs) {
    schema.definitions = mapObject(schema.definitions, createToplevelProperties($refs));
    return schema;
  });
};

exports.default = expandSubschemaProps;
//# sourceMappingURL=expandSubschemaAttrs.js.map