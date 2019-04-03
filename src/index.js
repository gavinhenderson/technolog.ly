const imagefinder = require('imagefinder');
const sharp = require('sharp');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function getLogoLinkFromPackageName(packageName) {
  const images = await imagefinder({
    keyword: `${packageName} logo`,
  });

  return images[0];
}

async function getCompositeImage(listOfPackages) {
  const images = [];

  await Promise.all(
    listOfPackages.map(async (currentPackage) => {
      const imageURL = await getLogoLinkFromPackageName(currentPackage);

      const imageRes = await fetch(imageURL);
      const imageBuffer = await imageRes.buffer();

      images.push(imageBuffer);
    }),
  );

  images.forEach((current, index) => {
    fs.writeFileSync(path.join(__dirname, 'test-' + index), current);
  });
}

module.exports = { getLogoLinkFromPackageName, getCompositeImage };
