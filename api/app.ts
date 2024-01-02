import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import { getRoutes, errorRoutes } from './routes';
import { dataLoader } from './middleware';
import "./__globals";

const PORT = process.env.API_PORT || 3000;

const app = express();
const stationsCatalogue = async (req: Request, res: Response, next: NextFunction) => {
  req.stationsCatalogue = await dataLoader();
  next();
};

app.use(stationsCatalogue);

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routing
app.use(getRoutes);
app.use(errorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
export { stationsCatalogue };
