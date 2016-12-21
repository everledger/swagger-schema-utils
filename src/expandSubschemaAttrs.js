/**
 * Expands all sub-schema attributes into empty attributes at the parent level
 * if `additionalProperties` is used in the parent schema.
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-11-01
 * @flow
 */

import { curry } from 'ramda';
import SwaggerParser from 'swagger-parser';

function mapObject(obj: Object, cb: (v: any, k: string, obj: Object) => any) {
  const newObj = {};
  Object.keys(obj).forEach(k => {
    newObj[k] = cb(obj[k], k, obj);
  });
  return newObj;
}

// @see http://stackoverflow.com/questions/22689900/ddg#23001194
const createToplevelProperties = curry(($refs, def) => {
  if (def.additionalProperties !== false) {
    return def;
  }

  const extras = (def.allOf || []).concat(def.anyOf || []).concat(def.oneOf || []);
  if (!extras.length) {
    return def;
  }

  def = { ...def }; // clone before manipulating

  if (!def.properties) {
    def.properties = {};
  }

  extras.forEach(schema => {
    if (schema.properties) {
      Object.keys(schema.properties).forEach(prop => (def.properties[prop] = {}));
    }
    if (schema.$ref) {
      const reference = $refs.get($refs.paths()[0] + schema.$ref);
      if (reference.properties) {
        Object.keys(reference.properties).forEach(prop => (def.properties[prop] = {}));
      }
    }
  });

  return def;
});


const expandSubschemaProps = (schema: Object): Object => {
  schema = { ...schema }; // clone before manipulating
  return SwaggerParser.resolve(schema).then(($refs) => {
    schema.definitions = mapObject(schema.definitions, createToplevelProperties($refs));
    return schema;
  });
};

export default expandSubschemaProps;
