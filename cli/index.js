#!/usr/bin/env node

(async () => {
  const program = require('commander');
  const version = require('../package.json').version;
  const fs = require('fs');
  const { getCompositeImage } = await require('../src')();

  program
    .version(version)
    .option(
      '-o, --output [file]',
      'Specify the output file to save the image to. Default: out.png',
    )
    .parse(process.argv);

  const package = JSON.parse(fs.readFileSync('package.json'));
  const deps = Object.keys(package.dependencies);
  const output = program.output || 'out.png';

  getCompositeImage(deps).then((image) => {
    image.write(output, () => console.log(`Image saved to '${output}'`));
  });
})();
