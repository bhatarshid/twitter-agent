import { Page } from "puppeteer";
import 'dotenv/config';
import { 
  // tweetTextId, 
  // X_cookiesExist, 
  // loadCookies, 
  // saveCookies, 
  signinButton, 
  loginEmailTextbox, 
  loginNextButtonText, 
  loginPasswordTextbox, 
  loginButtonText 
} from "@/lib";

// const emailCred = process.env.EMAIL_CREDENTIALS!
// const passwordCred = process.env.PASSWORD_CREDENTIALS!
// const userIdCred = process.env.USER_ID_CREDENTIALS!

// const signinService = async (page: Page, browser: Browser) => {
//   console.log("Signing in...");

//   // check if cookies exist
//   const checkCookies = await X_cookiesExist();

//   if (checkCookies) {
//     const cookies = await loadCookies();
//     await browser.setCookie(...cookies);
//     console.log('Cookies loaded and set on the browser.');

//     // Navigate to X to verify if cookies are valid
//     await page.goto("https://www.x.com/home", { waitUntil: 'networkidle2' });

//     // Check if login was successful by verifying page content
//     const isLoggedIn = await page.$(tweetTextId);
//     if (isLoggedIn) {
//       console.log("Login verified with cookies.");
//     } else {
//       console.log("Cookies invalid or expired. Logging in again...");
//       await loginWithCredentials(page, browser);
//     }
//     return;
//   }
//   else {
//     // If no cookies are available, perform login with credentials
//     await loginWithCredentials(page, browser);
//   }
// }

const loginWithCredentials = async (page: Page, data: {email: string; username: string; password: string}) => {
  // click signin
  const emailCred = data.email;
  const passwordCred = data.password;
  const userIdCred = data.username;
  
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

  // wait for navigation to complete
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // save cookies after login
  // const cookies = await browser.cookies();
  // await saveCookies(cookies);
  console.log("Signin Complete...")
}

export default loginWithCredentials;