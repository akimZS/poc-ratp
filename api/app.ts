import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import { getRoutes, errorRoutes } from './routes';
import { stationsCatalogue } from './config';
import "./__globals";

const PORT = process.env.API_PORT || 3000;

const app = express();

// load the data
app.use(stationsCatalogue);

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setup routing
app.use(getRoutes);
app.use(errorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
