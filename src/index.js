const imagefinder = require('imagefinder');

async function getLogoFromPackageName(packageName) {
  try {
    const images = await imagefinder({
      keyword: `${packageName} logo`,
    });
    return images;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getLogoFromPackageName };
