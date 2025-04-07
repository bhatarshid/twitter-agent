import puppeteer, { Browser } from "puppeteer";
import signinService from "./src/services/signin-service";
import { retweetService } from "./src/services/retweet-service";
require('dotenv').config();

const X_URL: string = process.env.X_URL!;

const runX = async () => {
  // start browser
  const browser: Browser = await puppeteer.launch({ headless: false });
  try {
    // open new page
    console.log("Opening website...");
    const page = await browser.newPage();
    await page.goto(X_URL);

    // signin
    await signinService(page, browser);

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await retweetService(page);

    // wait for 10 seconds and close browser
    setTimeout(async () => {
      await browser.close();
    }, 10000);
  }
  catch (error) {
    console.log({ error });
    await browser.close();
  }
}

runX();