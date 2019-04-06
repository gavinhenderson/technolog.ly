#!/usr/bin/env node

(async () => {
  const program = require('commander');
  const version = require('../package.json').version;
  const fs = require('fs');
  const { getCompositeImage } = await require('../src')();

  program.version(version).parse(process.argv);

  const package = JSON.parse(fs.readFileSync('package.json'));
  const deps = Object.keys(package.dependencies);

  getCompositeImage(deps).then((image) => {
    image.write('out.png', () => console.log('done'));
  });
})();
