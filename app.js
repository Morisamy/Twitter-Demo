const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(session({ secret: 'sssssss', resave: false, saveUninitialized: false }));

const client = new TwitterApi({ appKey: '79lIIMw4sii6GpczzPAzOgixF', appSecret: '32Wm3Ch2YlVw9BWl8lemHRgsgaeJgWX01GN9mnA0eGpRzoERsO' });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/auth/twitter', async (req, res) => {
  const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink('http://localhost:3000/callback');
  req.session.oauth_token_secret = oauth_token_secret;
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  const { oauth_token_secret } = req.session;

  const client = new TwitterApi({
    appKey: '79lIIMw4sii6GpczzPAzOgixF',
    appSecret: '32Wm3Ch2YlVw9BWl8lemHRgsgaeJgWX01GN9mnA0eGpRzoERsO',
    accessToken: oauth_token,
    accessSecret: oauth_token_secret,
  });

  const { accessToken, accessSecret } = await client.login(oauth_verifier);
  req.session.accessToken = accessToken;
  req.session.accessSecret = accessSecret;

  res.redirect('/tweet');
});

app.get('/tweet', (req, res) => {
  if (req.session.accessToken && req.session.accessSecret) {
    res.sendFile(__dirname + '/public/tweet.html');
  } else {
    res.redirect('/');
  }
});

app.post('/post-tweet', express.json(), async (req, res) => {
  const client = new TwitterApi({
    appKey: '79lIIMw4sii6GpczzPAzOgixF',
    appSecret: '32Wm3Ch2YlVw9BWl8lemHRgsgaeJgWX01GN9mnA0eGpRzoERsO',
    accessToken: req.session.accessToken,
    accessSecret: req.session.accessSecret,
  });

  try {
    const tweet = await client.v2.tweet(req.body.tweetContent);
    res.json({ success: true, tweetId: tweet.data.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error posting tweet' });
  }
});
app.get('/signup', (req, res) => {
    res.redirect('https://twitter.com/i/flow/signup');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});
app.get('/signup', (req, res) => {
    // This is a placeholder. In a real application, you'd implement the sign-up logic here.
    res.send(`
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    background: linear-gradient(to right, #00b09b, #96c93d);
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                    width: 80%;
                    max-width: 300px;
                }
                button {
                    background-color: #1DA1F2;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    margin: 10px 0;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Sign Up</h1>
                <p>Sign up functionality to be implemented.</p>
                <a href="/"><button>Back to Home</button></a>
            </div>
        </body>
        </html>
    `);
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
