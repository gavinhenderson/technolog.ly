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
  image.write('out.png', () => console.log(`Image saved to 'out.png'`));
})();
