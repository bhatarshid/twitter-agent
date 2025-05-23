import { Page, ElementHandle } from "puppeteer";
import {
  commentButtonId,
  commentInputId,
  likeId,
  replyId,
  tweetId,
  tweetTextId,
  delay
} from "@/lib";
import { automateRetweet } from "./automate-reply";
import { Server } from "socket.io";

// Configuration
const CONFIG = {
  maxTweets: 20,
  minLikesThreshold: 10,
  maxRetries: 3,
  minDelayBetweenActions: 2000,
  maxDelayBetweenActions: 8000,
  scrollDelay: 1000
};

export const processFollowingTweets = async (page: Page, socket: Server) => {
  let tweetIndex = 1;

  console.log("Processing tweets...");
  socket.emit("log", {text: "Processing tweets...", type: "system"});
  while (tweetIndex < CONFIG.maxTweets) {
    try {
      // Get all tweets on the page
      await page.waitForSelector(tweetTextId);
      const tweets = await page.$$(tweetId);

      for (const tweet of tweets) {
        if (tweetIndex >= CONFIG.maxTweets) break;

        let retryCount = 0;
        while (retryCount < CONFIG.maxRetries) {
          try {
            // First verify the tweet is still attached to DOM
            const isAttached = await page.evaluate(element => {
              return !!element.isConnected;
            }, tweet);

            if (!isAttached) {
              console.log(`Skipping tweet ${tweetIndex}: Tweet element is no longer attached to DOM`);
              break;
            }

            await processTweet(page, tweet, tweetIndex, socket);
            break;
          } catch (error) {
            retryCount++;
            console.error(`Error processing tweet ${tweetIndex} (attempt ${retryCount}/${CONFIG.maxRetries}):`, error);
            socket.emit('error', `Error processing tweet ${tweetIndex}: ${error}`);
            if (retryCount === CONFIG.maxRetries) {
              console.error(`Failed to process tweet ${tweetIndex} after ${CONFIG.maxRetries} attempts`);
              socket.emit('error', `Failed to process tweet ${tweetIndex} after ${CONFIG.maxRetries} attempts`);
            } else {
              await delay(CONFIG.minDelayBetweenActions);
            }
          }
        }
        tweetIndex++;
      }

      // Scroll with delay
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await delay(CONFIG.scrollDelay);
    }
    catch (error) {
      console.error(`Error during tweet processing at index ${tweetIndex}:`, error);
      socket.emit('error', `Error during tweet processing at index ${tweetIndex}: ${error}`);
      break;
    }
  }
}

const processTweet = async (page: Page, tweet: ElementHandle<Element>, tweetIndex: number, socket: Server) => {
  try {
    // Extract tweet text
    const tweetTextElement = await tweet.$(tweetTextId);
    if (!tweetTextElement) {
      console.log(`Skipping tweet ${tweetIndex}: No text element found`);
      return;
    }

    const tweetText = await page.evaluate((el: Element) => el?.textContent || '', tweetTextElement);
    socket.emit('log', { text: tweetText, type: 'tweet', number: tweetIndex });

    // Get likes count
    const likeCountElement = await tweet.$(likeId);
    if (!likeCountElement) {
      console.log(`Skipping tweet ${tweetIndex}: No like count element found`);
      return;
    }
    await likeCountElement.click();
    socket.emit('log', { type: 'like', completed: true });

    const likeCount = await page.evaluate((el: Element) => {
      const text = el?.textContent || '0';
      return parseInt(text.replace(/[^0-9]/g, '')) || 0;
    }, likeCountElement);

    // Only process tweets with sufficient engagement
    if (likeCount > CONFIG.minLikesThreshold) {
      // Get AI-generated reply
      const replyText = await automateRetweet(tweetText);
      socket.emit('log', { text: replyText, type: 'reply', skip: false });

      // Comment on the tweet
      const commentButton = await tweet.$(replyId);
      if (!commentButton) {
        console.log(`Skipping tweet ${tweetIndex}: Comment button not found`);
        return;
      }

      await commentButton.click();
      await page.waitForSelector(commentInputId);
      await page.type(commentInputId, replyText, { delay: 100 });
      await page.waitForSelector(commentButtonId);
      await page.click(commentButtonId);

      // Random delay between actions
      const waitTime = Math.floor(Math.random() *
        (CONFIG.maxDelayBetweenActions - CONFIG.minDelayBetweenActions)) +
        CONFIG.minDelayBetweenActions;
      console.log(`Waiting ${waitTime / 1000} seconds before next action...`);
      socket.emit('log', { text: `Waiting ${waitTime / 1000} seconds before next action...`, type: 'wait' });
      await delay(waitTime);
    } else {
      console.log(`Skipping tweet ${tweetIndex}: Insufficient likes (${likeCount} < ${CONFIG.minLikesThreshold})`);
      socket.emit('log', { text: `Skipping tweet ${tweetIndex}: Insufficient likes (${likeCount} < ${CONFIG.minLikesThreshold})`, type: 'reply', skip: true });
    }
  }
  catch (error) {
    console.error(`Error processing tweet ${tweetIndex}:`, error);
    socket.emit('error', `Error processing tweet ${tweetIndex}: ${error}`);
    throw error;
  }
}