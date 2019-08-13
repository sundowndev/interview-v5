import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import mongo from 'connect-mongo';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
// import { MONGODB_URI, SESSION_SECRET } from './util/secrets';

const MongoStore = mongo(session);

// Controllers (route handlers)
// import * as apiController from './controllers/api';
// import * as contactController from './controllers/contact';
// import * as homeController from './controllers/home';
// import * as userController from './controllers/user';

// API keys and Passport configuration
// import * as passportConfig from './config/passport';

// Create Express server
const app = express();

// Connect to MongoDB
// const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

// mongoose
//   .connect(mongoUrl, { useNewUrlParser: true })
//   .then(() => {
//     /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
//   })
//   .catch(err => {
//     console.log(
//       'MongoDB connection error. Please make sure MongoDB is running. ' + err,
//     );
//     // process.exit();
//   });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * API routes.
 */
app.get('/api', apiController.getApi);

export default app;
