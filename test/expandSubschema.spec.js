import test from 'ava';

import expandSubschemaAttrs from '../src/expandSubschemaAttrs';


test('should create empty attributes for sub-schema attrs', async(t) => {
  const output = await expandSubschemaAttrs({
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: {},
    definitions: {
      reader: {
        oneOf: [
          { $ref: '#/definitions/refnode' },
        ],
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

  t.deepEqual(output.definitions.reader, {
    oneOf: [
      { $ref: '#/definitions/refnode' },
    ],
    properties: {
      test: {},
    },
    additionalProperties: false,
  });
});

test('should create empty attributes for multiple sub-schemas', async(t) => {
  const output = await expandSubschemaAttrs({
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: {},
    definitions: {
      reader: {
        oneOf: [
          { $ref: '#/definitions/either1' },
          { $ref: '#/definitions/either2' },
        ],
        additionalProperties: false,
      },
      either1: {
        properties: { id: { type: 'string', format: 'uuid' } },
      },
      either2: {
        properties: { name: { type: 'string', minLength: 1, maxLength: 255 } },
      },
    },
  });

  t.deepEqual(output.definitions.reader, {
    oneOf: [
      { $ref: '#/definitions/either1' },
      { $ref: '#/definitions/either2' },
    ],
    properties: {
      id: {},
      name: {},
    },
    additionalProperties: false,
  });
});

test('should preserve any existing attributes', async(t) => {
  const output = await expandSubschemaAttrs({
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: {},
    definitions: {
      reader: {
        oneOf: [
          { $ref: '#/definitions/refnode' },
        ],
        properties: {
          keepme: { type: 'number' },
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

  t.deepEqual(output.definitions.reader, {
    oneOf: [
      { $ref: '#/definitions/refnode' },
    ],
    properties: {
      test: {},
      keepme: { type: 'number' },
    },
    additionalProperties: false,
  });
});

test('should not mutate input schema', async (t) => {
  const input = {
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: {},
    definitions: {
      test: {
        anyOf: [
          { $ref: '#/definitions/either1' },
          { $ref: '#/definitions/either2' },
        ],
        additionalProperties: false,
      },
      either1: {
        properties: { id: { type: 'string', format: 'uuid' } },
      },
      either2: {
        properties: { id: { type: 'string', minLength: 1, maxLength: 255 } },
      },
    },
  };
  const output = await expandSubschemaAttrs(input);

  t.notDeepEqual(input, output);
});

test('should be a no-op if schema does not define additionalProperties:false', async (t) => {
  const output = await expandSubschemaAttrs({
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: {},
    definitions: {
      reader: {
        allOf: [
          { $ref: '#/definitions/refnode' },
        ],
      },
      refnode: {
        type: 'object',
        patternProperties: /^x-/,
      },
    },
  });

  t.deepEqual(output, {
    swagger: "2.0",
    info: { version: '1.0', title: 'test' },
    paths: {},
    definitions: {
      reader: {
        allOf: [
          { $ref: '#/definitions/refnode' },
        ],
      },
      refnode: {
        type: 'object',
        patternProperties: /^x-/,
      },
    },
  });
});
