const sharp = require('sharp');

class CompositeImage {
  constructor(images, ops) {
    return (async () => {
      this.sharp = await sharp({
        create: {
          width: 1000,
          height: 1000,
          channels: 4,
          background: { r: 255, g: 0, b: 0, alpha: 0.5 },
        },
      })
        .composite(images)
        .png();

      return this;
    })();
  }

  async buffer() {
    return await this.sharp.toBuffer();
  }
}

module.exports = CompositeImage;
