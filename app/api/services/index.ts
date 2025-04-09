import puppeteer, { Browser } from "puppeteer";
import 'dotenv/config';
import { followingText } from "@/lib/utils";
import { processFollowingTweets } from "./process-tweet-service";
import signinService from "./signin-service";

const X_URL: string = process.env.X_URL!;

export default async function runX () {
  // start browser with additional configuration
  const browser: Browser = await puppeteer.launch({ 
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
    timeout: 60000 // Increase browser launch timeout to 60 seconds
  });

  try {
    // open new page
    console.log("Opening website...");
    const page = await browser.newPage();
    
    // Set a longer navigation timeout and wait until network is idle
    await page.setDefaultNavigationTimeout(60000); // 60 seconds timeout
    await page.goto(X_URL, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000 
    });

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