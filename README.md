# Twitter API v2 Demo

This project demonstrates the usage of Twitter API v2 using Node.js and the `twitter-api-v2` library. It provides a simple web application that allows users to authenticate with Twitter and perform various actions such as posting tweets, retrieving user information, and more.

## Features

- Twitter OAuth 2.0 authentication
- Post tweets
- Retrieve user information
- Fetch user timeline
- Search tweets
- Error handling and rate limit management

## Technologies Used

- Node.js
- Express.js
- twitter-api-v2 library
- EJS templating engine
- Railway for deployment

## Getting Started

1. Clone the repository:



git clone https://github.com/Morisamy/Twitter-Demo.git


2. Install dependencies:



npm install


3. Set up your Twitter Developer account and create a new application to obtain API keys and tokens.

4. Create a `.env` file in the root directory and add your Twitter API credentials:



TWITTER_API_KEY=your_api_key TWITTER_API_SECRET=your_api_secret TWITTER_ACCESS_TOKEN=your_access_token TWITTER_ACCESS_SECRET=your_access_secret


5. Start the application:



npm start


6. Open your browser and navigate to `http://localhost:3000` (or your deployed URL).

## Deployment

This project is deployed on Railway. To deploy your own instance:

1. Create a Railway account and set up a new project.
2. Connect your GitHub repository to Railway.
3. Set up the necessary environment variables in Railway's dashboard.
4. Deploy the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
