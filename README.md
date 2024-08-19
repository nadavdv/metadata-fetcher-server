# Metadata Fetcher App SERVER

This server is a Node.js/Express-based application that fetches metadata (title, description, and image) from a list of URLs provided via a POST request. It uses the Cheerio library to parse HTML, and Axios to fetch the webpage contents. The server also implements basic security and rate-limiting.

### API Routes
- POST /fetch-metadata
This route accepts a JSON body with an array of URLs and returns metadata (title, description, and image) for each URL.

### Errors
If there is an internal server error, a 500 Internal Server Error will be returned.  If metadata cannot be retrieved from a URL, the response for that URL will contain an error message instead of the metadata.

### Security
The server uses helmet to enhance security.

### Rate Limiting
- The /fetch-metadata route is limited to 5 requests per second for each IP address to prevent abuse.

### Trade offs
- The current implementation uses Promise.all to fetch metadata concurrently for all URLs. This improves performance, but it also may cause issues with very large URL array.

## Setup Instructions for local use 

### Backend (Node.js):
1. Navigate to the `/server` folder.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the server on `http://localhost:5000`.
