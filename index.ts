import puppeteer, { Browser } from "puppeteer";
import signinService from "./src/services/signin-service";
import { processFollowingTweets } from "./src/services/process-tweet-service";
import { followingText } from "./src/utils";
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

    console.log("Redirecting to Following page...");
    await page.waitForSelector(followingText);
    await page.click(followingText);
    await processFollowingTweets(page);

    // wait for 10 seconds and close browser
    setTimeout(async () => {
      await browser.close();
    }, 10000);
  }
  catch (error) {
    console.log({ error: error });
    await browser.close();
  }
}

runX();