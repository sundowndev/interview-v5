import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import express from 'express';
import flash from 'express-flash';
import lusca from 'lusca';

import * as roomsController from './controllers/rooms';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * API routes.
 */
app.get('/rooms', roomsController.getRooms);
app.get('/rooms/:id', roomsController.getRooms);

export default app;
