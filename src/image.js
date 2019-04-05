const sharp = require('sharp');
const fetch = require('node-fetch');

class Image {
  constructor(imageURL) {
    return (async () => {
      const imageRes = await fetch(imageURL);

      this.buffer = await imageRes.buffer();
      this.sharp = await sharp(this.buffer);
      this.metadata = await this.sharp.metadata();
      this.width = this.metadata.width;
      this.height = this.metadata.height;

      return this;
    })();
  }
}

module.exports = Image;
