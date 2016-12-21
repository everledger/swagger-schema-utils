/**
 * Loads up a Swagger schema from disk and correctly resolves all references
 *
 * @package: swagger-schema-utils
 * @author:  pospi <sam@everledger.io>
 * @since:   2016-11-01
 * @flow
 */

import resolveExternalRefs from './resolveExternalRefs';
import expandSubschemaAttrs from './expandSubschemaAttrs';

const loadSchema = (filePath: string) => {
  return resolveExternalRefs(filePath).then((schema) => expandSubschemaAttrs(schema));
};

export default loadSchema;
