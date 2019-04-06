const mergeImg = require('merge-img');

class CompositeImage {
  constructor(images, ops = {}) {
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

      return this;
    })();
  }

  async normaliseImages() {
    await Promise.all(
      this.images.map(async (current) => {
        await current.adjustSize({ height: 200 });
      }),
    );
  }

  async getCompositeImage() {
    const rows = await Promise.all(
      this.rows.map(async (currentRow) => {
        const buffers = await Promise.all(
          currentRow.map(async (current) => await current.getBuffer()),
        );
        return await mergeImg(buffers, { align: 'center', offset: 10 });
      }),
    );

    return await mergeImg(rows, {
      direction: true,
      align: 'center',
      offset: 10,
    });
  }
}

module.exports = CompositeImage;
