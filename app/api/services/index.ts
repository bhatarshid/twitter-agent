import puppeteer, { Browser } from "puppeteer";
import 'dotenv/config';
import { followingText } from "@/lib";
import { processFollowingTweets } from "./process-tweet-service";
import { getSocket } from "@/config/socket"; // Import the socket instance
import loginWithCredentials from "./signin-service";

const X_URL: string = process.env.X_URL!;

export default async function runX () {
  const socket = getSocket();
  socket.connect();

  const browser: Browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    executablePath: process.env.NODE_ENV === 'production' 
      ? '/usr/bin/google-chrome-stable'
      : puppeteer.executablePath(),
    timeout: 60000 // Increase browser launch timeout to 60 seconds
  });

  try {
    console.log("Opening website...");
    socket.emit('log', 'Opening website...'); 

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000); // 60 seconds timeout
    await page.goto(X_URL, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000 
    });

    await loginWithCredentials(page);
    socket.emit('log', 'Signed in successfully'); 

    console.log("Redirecting to Following page...");
    socket.emit('log', 'Redirecting to Following page...');

    await page.waitForSelector(followingText);
    await page.click(followingText);
    await processFollowingTweets(page, socket);

    setTimeout(async () => {
      await browser.close();
      socket.emit('log', 'Browser closed'); 
    }, 10000);
  }
  catch (error) {
    console.log({ error: error });
    socket.emit('error', error); // Emit error messages
    await browser.close();
  }
}