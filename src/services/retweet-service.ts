import { Page } from "puppeteer";
import { 
  followingText, 
  likeId, 
  replyId, 
  tweetId, 
  tweetTextId 
} from "../utils/constants";

export const retweetService = async (page: Page) => {
  try {
    console.log("Redirecting to Following page...");
    await page.waitForSelector(followingText);
    await page.click(followingText);

    console.log("Processing tweets...");
    // Get all tweets on the page
    await page.waitForSelector(tweetTextId);
    const tweets = await page.$$(tweetId);
    console.log("Tweets:", tweets.length);

    for (const tweet of tweets) {
      try {
        // Extract tweet text
        const tweetTextElement = await tweet.$(tweetTextId);
        if (!tweetTextElement) continue;

        const tweetText = await page.evaluate((el: Element) => el?.textContent || '', tweetTextElement);
        console.log("Tweet text:", tweetText);

        // Get likes count
        const likeCountElement = await tweet.$(likeId);
        if (!likeCountElement) continue;

        const likeCount = await page.evaluate((el: Element) => {
          const text = el?.textContent || '0';
          return parseInt(text.replace(/[^0-9]/g, '')) || 0;
        }, likeCountElement);
        console.log({ likeCount });

        // if likes > 500, click the comment button
        if (likeCount > 500) {
          // send this tweetText to GPT to get the reply


          // Commenting on the tweet
          const commentButton = await tweet.$(replyId);
          if (commentButton) {
            await commentButton.click();

            // Wait for the comment dialog to open

            // Type the reply
          }
        }
      }
      catch (error) {
        console.log("Error processing tweet:", error);
        continue;
      }
    }
  }
  catch (error) {
    console.log({ error });
  }
}
