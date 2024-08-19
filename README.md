# Metadata Fetcher App SERVER

## Setup Instructions for local use 

### Backend (Node.js):
1. Navigate to the `/server` folder.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the server on `http://localhost:5000`.


### API Routes
- POST /fetch-metadata
This route accepts a JSON body with an array of URLs and returns metadata (title, description, and image) for each URL.

### Rate Limiting
- The /fetch-metadata route is limited to 5 requests per second for each IP address to prevent abuse.