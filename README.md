# graphql-auth

Small app implementing authentication using react, context, graphql, apollo, express-session & passportjs.

To run:
create a file named .env.js and an exported MONGO_URI variable containing the url to your mongodb instance, eg:
const MONGO_URI = '<MONGODB_URL>';
module.exports = MONGO_URI;

Then in the console:
npm install
npm run dev
