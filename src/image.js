const sharp = require('sharp');
const Promise = require('bluebird');
const fetch = require('node-fetch');

Promise.promisifyAll(sharp.prototype, { multiArgs: true });

class Image {
  constructor(imageURL) {
    return (async () => {
      this.url = imageURL;
      const imageRes = await fetch(imageURL);

      this.buffer = await imageRes.buffer();
      this.sharp = await sharp(this.buffer);
      await this.setMetaData();

      return this;
    })();
  }

  async adjustHeight(height) {
    let resizeOps = {};

    if (this.height * 2 < this.width) {
      resizeOps.width = height * 2;
    } else {
      resizeOps.height = height;
    }

    console.log('height', this.height);
    console.log('width', this.width);
    console.log('url', this.url);
    console.log(resizeOps);

    await this.sharp.resize({ height });
    await this.setMetaData();

    console.log(await this.sharp.toBuffer());

    console.log('height', this.height);
    console.log('width', this.width);
    console.log();
  }

  async setMetaData() {
    this.metadata = await this.sharp.metadata();
    this.width = this.metadata.width;
    this.height = this.metadata.height;
  }
}

module.exports = Image;
