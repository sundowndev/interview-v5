import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express from 'express';
import flash from 'express-flash';
import lusca from 'lusca';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

// Internal
import api_response_error from './response/api_error_response';
import api_response from './response/api_response';
import logger from './utils/logger';
import populate from './utils/populate';

// Routes
import bookingsRoutes from './routes/bookings';
import roomsRoutes from './routes/rooms';

// Create Express server
const app = express();

const corsOptions = {
  origin: process.env.BASE_URL || 'http://localhost:8000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Express configuration
app.use(cors(corsOptions));
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(morgan('[:method] :url :status - :response-time ms'));

/**
 * Registering routes
 */
app.use('/rooms', roomsRoutes);
app.use('/bookings', bookingsRoutes);

/**
 * Response
 */
app.use(api_response);
app.use(api_response_error);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

async function main() {
  try {
    const connection = await createConnection({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      username: 'admin',
      password: '',
      database: 'interview-v5',
      entities: [__dirname + '/entity/*.js'],
      synchronize: false,
      logging: false,
      useNewUrlParser: true,
      validateOptions: { useUnifiedTopology: true },
    });

    // ---------- SERVER ----------
    app.listen(app.get('port'), () => {
      logger.info(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env'),
      );
      logger.warn('Press CTRL-C to stop\n');
    });

    // Populate database (if not production environment)
    return process.env.NODE_ENV !== 'production'
      ? await populate(connection)
      : null;
  } catch (error) {
    return logger.error(error);
  }
}

process.on('SIGINT', () => {
  process.exit(-1);
});

main();

export default app;
