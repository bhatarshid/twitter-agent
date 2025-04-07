import { Page } from "puppeteer";
import { 
  commentButtonId,
  commentInputId,
  likeId, 
  replyId, 
  tweetId, 
  tweetTextId 
} from "../utils/constants";
import { automateRetweet } from "./automate-retweet";
import { delay } from "../utils";

export const processFollowingTweets = async (page: Page) => {
  let tweetIndex = 1;
  const maxTweets = 10;

  console.log("Processing tweets...");
  while (tweetIndex < maxTweets) {
    try {
      // Get all tweets on the page
      await page.waitForSelector(tweetTextId);
      const tweets = await page.$$(tweetId);
      console.log("Tweets:", tweets.length);

      for (const tweet of tweets) {
        await processTweet(page, tweet, tweetIndex);
        tweetIndex++;
      }

      // scroll
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    }
    catch (error) {
      console.error(`Error interacting with tweet ${tweetIndex}:`, error);
      break;
    }
  }
}

const processTweet = async (page: Page, tweet: any, tweetIndex: number) => {
  try {
    // Extract tweet text
    const tweetTextElement = await tweet.$(tweetTextId);
    if (!tweetTextElement) return;

    const tweetText = await page.evaluate((el: Element) => el?.textContent || '', tweetTextElement);
    console.log("Tweet text:", tweetText);

    // Get likes count
    const likeCountElement = await tweet.$(likeId);
    if (!likeCountElement) {
      throw new Error("Like count element not found");
    };

    const likeCount = await page.evaluate((el: Element) => {
      const text = el?.textContent || '0';
      return parseInt(text.replace(/[^0-9]/g, '')) || 0;
    }, likeCountElement);
    console.log({ likeCount });

    // if likes > 500, click the comment button
    if (likeCount > 5) {
      // send this tweetText to GPT to get the reply
      // const retweetText = await automateRetweet(tweetText);
      // console.log({ retweetText });

      // Commenting on the tweet
      const commentButton = await tweet.$(replyId);
      await commentButton.click();
      await page.waitForSelector(commentInputId);
      await page.type(commentInputId, 'retweetText', { delay: 100 });
      await page.waitForSelector(commentButtonId);;
      await page.click(commentButtonId);

      const waitTime = Math.floor(Math.random() * 5000) + 5000;
      console.log(`Waiting ${waitTime / 1000} seconds before moving to the next post...`);
      await delay(waitTime);
    }

  }
  catch (error) {
    console.error(`Error processing tweet ${tweetIndex}:`, error);
    throw error;
  }
}
