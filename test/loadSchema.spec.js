import test from 'ava';

import loadSchema from '../src/loadSchema';

// :NOTE: we don't have to test this other than to ensure it runs, since all components are tested individually

test('should load and normalise schemas', async (t) => {
  const schema = await loadSchema(__dirname + '/fixtures/externalRefs.yaml');

  t.deepEqual(schema, {
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: null,
    definitions: {
      reader: {
        oneOf: [
          { $ref: '#/definitions/refnode' },
        ],
        properties: {
          test: {},
        },
        additionalProperties: false,
      },
      refnode: {
        type: 'object',
        properties: {
          test: { type: 'string' },
        },
      },
    },
  });
});
