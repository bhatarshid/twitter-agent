import puppeteer, { Browser } from "puppeteer";
import 'dotenv/config';
import { followingText } from "@/lib";
import { processFollowingTweets } from "./process-tweet-service";
import { getSocketServer } from '@/config/socket-server';
import loginWithCredentials from "./signin-service";

const X_URL: string = process.env.X_URL!;

export default async function runX (data: {email: string; username: string; password: string;}) {
  const io = getSocketServer();

  const browser: Browser = await puppeteer.launch({ 
    headless: process.env.PROD === 'false' ? false : true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    executablePath: process.env.NODE_ENV === 'production' 
      ? '/usr/bin/google-chrome-stable'
      : puppeteer.executablePath(),
    timeout: 60000
  });

  try {
    console.log("Opening website...");
    io.emit('log', {text: 'Getting Started...', type: 'system'}); 

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000); // 60 seconds timeout
    await page.goto(X_URL, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000 
    });

    io.emit('log', {text: 'Authenticating...', type: 'system'});
    await loginWithCredentials(page, data);
    io.emit('log', {text: 'Signed in successfully', type: 'system'}); 

    console.log("Redirecting to Following page...");
    io.emit('log', {text: 'Fetching the Tweets of Accounts You Follow...', type: 'system'});

    await page.waitForSelector(followingText);
    await page.click(followingText);
    await processFollowingTweets(page, io);

    setTimeout(async () => {
      await browser.close();
      io.emit('log', {text: 'Closing browser...', type: 'system'}); 
    }, 10000);
  }
  catch (error) {
    console.log({ error: error });
    io.emit('error', error); // Emit error messages
    await browser.close();
  }
}