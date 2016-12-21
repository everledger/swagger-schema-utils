import test from 'ava';

import resolveExternalRefs from '../src/resolveExternalRefs';


test('should resolve external files and inline them', async (t) => {
  const schema = await resolveExternalRefs(__dirname + '/fixtures/externalRefs.yaml');
  t.deepEqual(schema.definitions.refnode, {
    type: 'object',
    properties: {
      test: { type: 'string' },
    },
  });
});

test('should provide helpful error messages if referenced files can\'t be loaded', async (t) => {
  const errs = await t.throws(resolveExternalRefs(__dirname + '/fixtures/unresolvableRefs.yaml'));
  t.is(errs.length, 1);
  t.is(errs[0].ref, '#/definitions/refnode');
  t.truthy(errs[0].error.match(/^ENOENT/));
});

test('should provide multiple errors if multiple refs fail', async (t) => {
  const errs = await t.throws(resolveExternalRefs(__dirname + '/fixtures/unresolvableRefs2.yaml'));
  t.is(errs.length, 2);
});

test('should throw an error if the schema file doesn\'t exist', async (t) => {
  const err = await t.throws(resolveExternalRefs('./NOBODBOA'));
  t.is(err.code, 'ENOENT');
});
