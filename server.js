const express = require('express')
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const helmet = require('helmet');
const app = express()

const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(helmet());

// rate limit middleware
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // limit each IP to 5 requests per second
    message: "Too many requests, please try again later.",
  });

// Apply the rate limiter to the /fetch-metadata route
app.use('/fetch-metadata', limiter);

// routing
app.post('/fetch-metadata', async (req, res) => {
    const { urls } = req.body; // extract URLs

    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ error: "Invalid input. Please provide an array of URLs." });
    }

    try {
        const metadataResults = await Promise.all(
            urls.map(async (url) => {
                try {
                    // fetch html
                    const { data } = await axios.get(url);
                    const $ = cheerio.load(data);

                    // extract metadata
                    const title = $('head > title').text() || null;
                    const description = $('meta[name="description"]').attr('content') || null;
                    const image = $('meta[property="og:image"]').attr('content') || null;

                    return {url, title, description, image};
                } catch (error) {
                    return { url, error: "Failed to fetch metadata" };
                }
            })
        );

        res.json(metadataResults);
    } catch (error) {
        res.status(500).json({error: "Server error" });
    }
});

app.listen(port, ()=> {console.log(`listening on port ${port}`)})