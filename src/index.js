const imagefinder = require('imagefinder');
const sharp = require('sharp');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const Image = require('./image');
const CompositeImage = require('./composite-image');

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
      const currentImage = await new Image(imageURL);

      images.push(currentImage);
    }),
  );

  const composite = await new CompositeImage(images, {});

  return await composite.buffer();
}

module.exports = { getLogoLinkFromPackageName, getCompositeImage };
