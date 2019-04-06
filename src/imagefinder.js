module.exports = async () => {
  const puppeteer = require('puppeteer');
  const delay = require('delay');
  const url = require('url');
  const querystring = require('querystring');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  return {
    search: async ({ keyword }) => {
      const page = await browser.newPage();
      await page.goto(
        `https://www.google.com/search?q=${keyword.replace(
          / /g,
          '+',
        )}&source=lnms&tbm=isch&sa=X`,
      );

      await delay(1000);

      await page.waitForSelector('#search a');
      const stories = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('#search a'));
        return links.map((link) => link.href);
      });

      await page.close();

      const imgs = stories
        .map((link) => querystring.parse(url.parse(link).query).imgurl)
        .filter((img) => img);

      return await Promise.resolve(imgs);
    },
    close: async () => {
      await browser.close();
    },
  };
};
