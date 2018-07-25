const path = require('path');
const fs = require('fs-extra');

function getPaths(abs, rel, ext) {
  return fs
    .stat(path.join(abs, rel))
    .then(stats => {
      if (stats.isFile()) {
        return {
          rel,
          ext
        };
      }

      return Promise.reject();
    })
    .catch(err => {
      if (!path.extname(rel) || path.extname(rel).slice(1) !== ext) {
        return getPaths(abs, `${rel}.${ext}`, ext);
      }

      throw err;
    })
    .catch(err => {
      return fs.stat(path.join(abs, rel)).then(stats => {
        if (stats.isDirectory()) {
          return getPaths(abs, `${rel}/index.${ext}`, ext);
        }

        throw err;
      });
    });
}

module.exports = getPaths;
