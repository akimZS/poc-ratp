import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import { getRoutes } from './routes';
import { Platforms } from './parsing/platforms';
import { dataLoader } from './misc';

declare global {
  namespace Express {
    interface Request {
      stationsCatalogue: Platforms;
    }
  }
}

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
app.use(getRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(
  (
    err: { message: any; status: any },
    req: { app: { get: (arg0: string) => string } },
    res: {
      locals: { message: any; error: any };
      status: (arg0: any) => void;
      render: (arg0: string) => void;
    }
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export default app;
export { stationsCatalogue };
