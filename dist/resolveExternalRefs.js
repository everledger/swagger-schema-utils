'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (filePath) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.readFile(filePath, function (err, file) {
      if (err) {
        return reject(err);
      }

      var main = _yamlJs2.default.load(file.toString());
      var options = {
        filter: ['relative', 'remote'],
        loaderOptions: {
          processContent: function processContent(res, callback) {
            callback(null, _yamlJs2.default.load(res.text));
          }
        },
        relativeBase: _path2.default.dirname(filePath)
      };

      (0, _jsonRefs.resolveRefs)(main, options).then(function (result) {
        var errs = (0, _keys2.default)(result.refs).reduce(function (failures, ref) {
          var data = result.refs[ref];
          if (data.error) {
            failures.push({ ref: ref, error: data.error });
          }
          return failures;
        }, []);
        if (errs.length) {
          return reject(errs);
        }
        resolve(result.resolved);
      }).catch(reject);
    });
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonRefs = require('json-refs');

var _yamlJs = require('yaml-js');

var _yamlJs2 = _interopRequireDefault(_yamlJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=resolveExternalRefs.js.map