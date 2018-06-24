module.exports = {
  mongoURI: process.env.MONGO_URI, // This is the connection to the mongoDB
  secretOrKey: process.env.SECRET_OR_KEY // This is for JWT strategy
};
