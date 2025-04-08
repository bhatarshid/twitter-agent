import puppeteer, { Browser } from "puppeteer";
import 'dotenv/config';
import { followingText } from "@/lib/utils";
import { processFollowingTweets } from "./process-tweet-service";
import signinService from "./signin-service";

const X_URL: string = process.env.X_URL!;

export default async function runX () {
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