# Twitter Agent

Twitter Agent is a TypeScript-based project designed to automate interactions with Twitter. It uses Puppeteer for browser automation and integrates with the Gemini API for generating content.

## Features

- **Automated Replies**: Generates thoughtful and engaging replies to tweets using the Gemini API.
- **Tweet Processing**: Processes tweets based on engagement metrics like likes and generates replies for tweets that meet the threshold.
- **Sign-In Automation**: Automates the sign-in process using stored cookies or user credentials.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/bhatarshid/twitter-agent.git
    cd twitter-agent
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    GEMINI_API_KEY=your_gemini_api_key
    EMAIL_CREDENTIALS=your_email
    PASSWORD_CREDENTIALS=your_password
    USER_ID_CREDENTIALS=your_user_id
    X_URL=https://www.x.com
    ```

## Usage

1. **Run the application**:
    ```bash
    npm start
    ```

## Project Structure

- **index.ts**: Main entry point of the application. It launches the browser, handles the sign-in process, and starts tweet processing.
- **src/services/automate-reply.ts**: Contains the logic for generating automated replies using the Gemini API.
- **src/services/process-tweet-service.ts**: Processes tweets, checks engagement metrics, and generates replies for tweets with sufficient likes.
- **src/services/signin-service.ts**: Handles the sign-in process using stored cookies or credentials.
- **src/utils/constants.ts**: Contains constants used across the application.
- **src/utils/index.ts**: Utility functions used in the application.

## Dependencies

- **axios**: For making HTTP requests to the Gemini API.
- **puppeteer**: For browser automation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
