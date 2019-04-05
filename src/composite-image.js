const sharp = require('sharp');

class CompositeImage {
  constructor(images, ops) {
    return (async () => {
      this.cols = ops.columns || 5;
      this.images = images;
      await this.normaliseImages();

      this.rows = [];

      for (let i = 0; i <= Math.floor(images.length / this.cols); i++) {
        this.rows.push([]);
      }

      images.forEach((current, index) => {
        const targetRow = Math.floor(index / this.cols);

        this.rows[targetRow].push(current);
      });

      const imageObjects = images.map((current) => ({
        input: current.buffer,
        gravity: 'south',
      }));

      this.sharp = await sharp({
        create: {
          width: 3000,
          height: 3000,
          channels: 4,
          background: { r: 255, g: 0, b: 0, alpha: 0.5 },
        },
      }).composite(imageObjects);

      return this;
    })();
  }

  async normaliseImages() {
    let heights = this.images.map((current) => current.height);
    this.rowHeight = Math.max(...heights);
    console.log;

    await Promise.all(
      this.images.map(async (current) => {
        await current.adjustHeight(this.rowHeight);
      }),
    );
  }

  async buffer() {
    return await this.sharp.png().toBuffer();
  }
}

module.exports = CompositeImage;
