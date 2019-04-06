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
    .option(
      '-c, --columns [number of columns]',
      'Enter the number of logos you would like per row. Default: 5',
    )
    .parse(process.argv);

  const package = JSON.parse(fs.readFileSync('package.json'));
  const deps = Object.keys(package.dependencies);
  const output = program.output || 'out.png';
  const columns = program.columns || 5;

  getCompositeImage(deps, columns).then((image) => {
    image.write(output, () => console.log(`Image saved to '${output}'`));
  });
})();
