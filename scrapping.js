import puppeteer from "puppeteer";

const scrapping = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--unhandled-rejections=strict",
      "--incognito",
    ],
  });

  const page = (await browser.pages())[0];
  page.setDefaultNavigationTimeout(0);
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await page.waitForSelector(".main-box-inside");
  const today_url_jobs = await page.$$eval(".entry-title a", (links) => {
    return links.map((links) => links.getAttribute("href"));
  });
  const datetime_posts = await page.$$eval(
    "article .entry-content time",
    (links) => {
      return links.map((links) => links.getAttribute("datetime"));
    }
  );

  await browser.close();
  return { today_url_jobs, datetime_posts };
};

export { scrapping };
