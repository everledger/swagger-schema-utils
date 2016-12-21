/**
 * Resolves external schema file references to create a single schema
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-12-21
 * @flow
 */

import fs from 'fs';
import path from 'path';
import { resolveRefs } from 'json-refs';
import YAML from 'yaml-js';

export default function(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) {
        return reject(err);
      }

      const main = YAML.load(file.toString());
      const options = {
        filter: ['relative', 'remote'],
        loaderOptions: {
          processContent: (res, callback) => {
            callback(null, YAML.load(res.text));
          },
        },
        relativeBase: path.dirname(filePath),
      };

      resolveRefs(main, options).then((result) => resolve(result.resolved)).catch(reject);
    });
  });
}
