import createError from 'http-errors';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import axios from 'axios';
import 'dotenv/config';

const PORT = process.env.API_PORT || 3000;

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Root page.');
});

app.get('/bus-timetable/:busStationNumber', async (req: Request, res: Response) => {
  const busStationNumber = req.params.busStationNumber;
  const result = await axios.get(
    `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF:StopPoint:Q:${busStationNumber}:`,
    {
      headers: { Accept: 'application/json', apikey: process.env.RATP_DYNAMIC_TOKEN }
    }
  );

  const data = result.data
  const stationData = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;
  
  // Print station data
  const stationName = JSON.stringify(stationData[0].MonitoredVehicleJourney.MonitoredCall.StopPointName[0].value);
  console.log(`
    Nom de station: ${stationName}
    Heure actuelle : ${new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false})}
  `);
  
  for (let i = 0; i < stationData.length; i++) {
    const mvj = stationData[i].MonitoredVehicleJourney
    const line = mvj.OperatorRef.value
    const direction = mvj.DestinationName[0].value;
    const timeNext = new Date(mvj.MonitoredCall.ExpectedDepartureTime);
    const timeNow = new Date();
    const timeNextCountdown = (Math.abs(timeNext.getTime() - timeNow.getTime()) / (1000 * 60)).toFixed(0);
    const minuteLabel = parseFloat(timeNextCountdown) > 1 ? "minutes" : "minute";

    console.log((`
      Ligne: ${line}
      Direction: ${direction}
      Prochain passage: ${timeNext.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false})} (dans ${timeNextCountdown} ${minuteLabel})
    `))  
  }
  res.send(JSON.stringify(data, null, 2))
});

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

module.exports = app;
