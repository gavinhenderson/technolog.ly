module.exports = async () => {
  const imagefinder = await require('./imagefinder')();
  const Image = require('./image');
  const CompositeImage = require('./composite-image');
  const mergeImg = require('merge-img');

  async function getLogoLinkFromPackageName(packageName) {
    const images = await imagefinder.search({
      keyword: `${packageName} logo`,
    });

    for (let i = 0; i < images.length; i++) {
      if (
        images[i].toLowerCase().endsWith('.png') ||
        images[i].toLowerCase().endsWith('.jpg')
      )
        return images[i];
    }
  }

  return {
    getCompositeImage: async function(listOfPackages) {
      const images = [];

      await Promise.all(
        listOfPackages.map(async (currentPackage) => {
          const imageURL = await getLogoLinkFromPackageName(currentPackage);

          const currentImage = await new Image(imageURL);

          images.push(currentImage);
        }),
      );

      imagefinder.close();
      const composite = await new CompositeImage(images);

      return await composite.getCompositeImage();
    },
  };
};
