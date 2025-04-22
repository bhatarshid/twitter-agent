# Twitter Agent

Twitter Agent is a TypeScript-based project designed to automate interactions with X (Twitter). It leverages Puppeteer for browser automation and integrates with the Gemini API for generating content. This project is built with Next.js and TailwindCSS for a modern and scalable development experience.

## Features

- **Automated Replies**: Generates thoughtful and engaging replies to tweets using the Gemini API.
- **Tweet Processing**: Processes tweets based on engagement metrics like likes and generates replies for tweets that meet the threshold.
- **Sign-In Automation**: Automates the sign-in process using user credentials.
- **Real-Time Communication**: Uses Socket.IO for real-time communication between the server and client.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/twitter-agent.git
    cd twitter-agent
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    GEMINI_API_KEY=yougeminiapikey
    X_URL=https://www.x.com
    DEV_URL=localhost
    PORT=3000
    PROD_URL=yourprodurl
    PROD=falseortrue
    ```

## Usage

1. **Run the application in development mode**:
    ```bash
    npm run dev
    ```

2. **Build the application**:
    ```bash
    npm run build
    ```

3. **Start the production server**:
    ```bash
    npm start
    ```

## Project Structure

- **`app/`**: Contains the Next.js application and APIs, including global styles and page components.
- **`components/`**: Reusable UI components.
- **`config/`**: Configuration files, including the WebSocket server setup.
- **`lib/`**: Utility functions and constants used across the application.
- **`server.ts`**: Entry point for the backend server.
- **`.env`**: Environment variables for sensitive data like API keys and credentials.

## Dependencies

- **Next.js**: Framework for building server-rendered React applications.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Puppeteer**: For browser automation.
- **Socket.IO**: For real-time communication.
- **Radix UI**: For accessible and customizable UI components.
- **Zod**: For schema validation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Feel free to contribute to this project by submitting issues or pull requests!
