const Promise = require('bluebird');
const fetch = require('node-fetch');
const Jimp = require('jimp');

class Image {
  constructor(imageURL) {
    return (async () => {
      this.url = imageURL;
      const imageRes = await fetch(imageURL);
      this.buffer = await imageRes.buffer();
      this.jimp = await Jimp.read(this.buffer);
      this.buffer = await this.getBuffer();

      return this;
    })();
  }

  getHeight() {
    return this.jimp.bitmap.height;
  }

  getWidth() {
    return this.jimp.bitmap.width;
  }

  async getBuffer() {
    return await this.jimp.getBufferAsync(Jimp.MIME_PNG);
  }

  async adjustSize(adjustOps) {
    if (adjustOps.height === undefined) {
      adjustOps.height = Jimp.AUTO;
    } else if (adjustOps.width === undefined) {
      adjustOps.width = Jimp.AUTO;
    }

    this.jimp = await this.jimp.resize(adjustOps.width, adjustOps.height);
  }
}

module.exports = Image;
