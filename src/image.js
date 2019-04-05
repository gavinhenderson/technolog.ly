const sharp = require('sharp');

class Image {
  constructor(buffer) {
    return (async () => {
      this.buffer = buffer;
      this.sharp = await sharp(buffer);
      this.metadata = await this.sharp.metadata();
      this.width = this.metadata.width;
      this.height = this.metadata.height;

      return this;
    })();
  }
}

module.exports = Image;
