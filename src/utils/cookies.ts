import fs from 'fs';
import path from 'path';

const COOKIES_PATH = "./cookies/XCookies.json";

export async function X_cookiesExist(): Promise<boolean> {
  try {
    await fs.promises.access(COOKIES_PATH); // Check if file exists
    const cookiesData = await fs.promises.readFile(COOKIES_PATH, "utf-8");
    const cookies = JSON.parse(cookiesData);

    // cookie validation
    const authCookie = cookies.find((cookie: { name: string }) => cookie.name === 'auth_token');

    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Validate auth cookie
    if (authCookie && authCookie.expires > currentTimestamp) {
      return true;
    }

    return false;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      console.log("Cookies file does not exist.");
      return false;
    } else {
      console.log("Error checking cookies:", error);
      return false;
    }
  }
}


export const saveCookies = async (cookies: any) => {
  try {
    const dir = path.dirname(COOKIES_PATH);
    await fs.promises.mkdir(dir, { recursive: true });
    await fs.promises.writeFile(COOKIES_PATH, JSON.stringify(cookies, null, 2));
    console.log("Cookies saved successfully.");
  } catch (error) {
    console.error("Error saving cookies:", error);
    throw new Error("Failed to save cookies.");
  }
}

export async function loadCookies(): Promise<any[]> {
  try {
    // Check if the file exists
    await fs.promises.access(COOKIES_PATH);

    // Read and parse the cookies file
    const cookiesData = await fs.promises.readFile(COOKIES_PATH, "utf-8");
    const cookies = JSON.parse(cookiesData);
    return cookies;
  } catch (error) {
    console.log("Cookies file does not exist or cannot be read.", error);
    return [];
  }
}