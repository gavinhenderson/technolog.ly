const imagefinder = require('imagefinder');
const sharp = require('sharp');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const Image = require('./image');

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

      images.push(await new Image(imageBuffer));
    }),
  );

  const imageObjects = images.map((current) => ({
    input: current.buffer,
    gravity: 'south',
  }));

  return await sharp({
    create: {
      width: 1000,
      height: 1000,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 0.5 },
    },
  })
    .composite(imageObjects)
    .png()
    .toBuffer();
}

module.exports = { getLogoLinkFromPackageName, getCompositeImage };
