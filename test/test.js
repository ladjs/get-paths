const path = require('path');
const test = require('ava');

const getPaths = require('../');

const contentDir = path.resolve(`${__dirname}/content`);

test('returns a function', t => {
  t.true(typeof getPaths === 'function');
});

test('gets a file', async t => {
  const val = await getPaths(contentDir, 'alpha', 'pug');

  t.deepEqual(val, { ext: 'pug', rel: 'alpha.pug' });
});

test('gets a file with explicit extension', async t => {
  const val = await getPaths(contentDir, 'alpha.pug', 'pug');

  t.deepEqual(val, { ext: 'pug', rel: 'alpha.pug' });
});

test('gets a file without explicit extension', async t => {
  const val = await getPaths(contentDir, 'alpha', 'pug');

  t.deepEqual(val, { ext: 'pug', rel: 'alpha.pug' });
});

test('gets a directory index', async t => {
  const val = await getPaths(contentDir, 'beta', 'pug');

  t.deepEqual(val, { ext: 'pug', rel: 'beta/index.pug' });
});

test('prioritizes files over directories', async t => {
  const val = await getPaths(contentDir, 'gamma', 'pug');

  t.deepEqual(val, { ext: 'pug', rel: 'gamma.pug' });
});

test('does not get a nonexistent path', async t => {
  try {
    await getPaths(contentDir, 'omega', 'pug');

    t.fail();
  } catch (err) {
    t.is(err.code, 'ENOENT');

    t.pass();
  }
});
