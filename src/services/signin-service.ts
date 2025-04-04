import { Page } from "puppeteer";
import { loginButtonText, 
  loginEmailTextbox, 
  loginNextButtonText, 
  loginPasswordTextbox, 
  signinButton 
} from "../utils/constants";
require('dotenv').config();

const emailCred = process.env.EMAIL_CREDENTIALS!
const passwordCred = process.env.PASSWORD_CREDENTIALS!
const userIdCred = process.env.USER_ID_CREDENTIALS!

const signinService = async (page: Page) => {
  // click signin
    await page.waitForSelector(signinButton);
    await page.click(signinButton);

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // enter email
    await page.waitForSelector(loginEmailTextbox);
    await page.type(loginEmailTextbox, emailCred, { delay: 100 });
    const nextEmailButton = await page.waitForSelector(loginNextButtonText);
    if (nextEmailButton) {
      await nextEmailButton.click();
    }

    // if there is a user id verification, then enter
    await page.waitForSelector(loginEmailTextbox);
    await page.type(loginEmailTextbox, userIdCred, { delay: 100 });
    const nextUserIdButton = await page.waitForSelector(loginNextButtonText);
    if (nextUserIdButton) {
      await nextUserIdButton.click();
    }

    // enter password
    await page.waitForSelector(loginPasswordTextbox);
    await page.type(loginPasswordTextbox, passwordCred, { delay: 100 });
    const loginButton = await page.waitForSelector(loginButtonText);
    if (loginButton) {
      await loginButton.click();
    }

    return;
}

export default signinService;
