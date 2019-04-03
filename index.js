const listOfPackages = [
  'coveralls',
  'eslint',
  'express',
  'handlebars',
  'jest',
  'puppeteer',
  'react',
];

const { getLogoFromPackageName } = require('./src');

listOfPackages.forEach((current) => {
  getLogoFromPackageName(current).then((currentImages) => {
    console.log(current, currentImages[0]);
  });
});
