const listOfPackages = [
  'coveralls',
  'eslint',
  'express',
  'handlebars',
  'jest',
  'puppeteer',
  'react',
];

const { getLogoLinkFromPackageName, getCompositeImage } = require('./src');
const fs = require('fs');
const path = require('path');

(async () => {
  const image = await getCompositeImage(listOfPackages);

  fs.writeFileSync(path.join(__dirname, 'test.png'), image);
})();
