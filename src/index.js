const imagefinder = require('imagefinder');
const sharp = require('sharp');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const Image = require('./image');
const CompositeImage = require('./composite-image');
const mergeImg = require('merge-img');

async function getLogoLinkFromPackageName(packageName) {
  const images = await imagefinder({
    keyword: `${packageName} logo`,
  });

  for (let i = 0; i < images.length; i++) {
    if (!images[i].toLowerCase().endsWith('.svg')) return images[i];
  }
}

async function getCompositeImage(listOfPackages) {
  const images = [];

  await Promise.all(
    listOfPackages.map(async (currentPackage) => {
      const imageURL = await getLogoLinkFromPackageName(currentPackage);

      const currentImage = await new Image(imageURL);

      images.push(currentImage.buffer);
    }),
  );

  return await mergeImg(images);
}

module.exports = { getLogoLinkFromPackageName, getCompositeImage };
