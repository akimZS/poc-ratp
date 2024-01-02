import axios from 'axios';
import { Request, Response, Router } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(req.stationsCatalogue);
});

router.get('/bus-timetable/:busStationNumber', async (req: Request, res: Response) => {
  const busStationNumber = req.params.busStationNumber;
  const result = await axios.get(
    `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF:StopPoint:Q:${busStationNumber}:`,
    {
      headers: { Accept: 'application/json', apikey: process.env.RATP_DYNAMIC_TOKEN }
    }
  );

  const data = result.data;
  const stationData = data.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit;

  // Print station data
  const stationName = stationData[0].MonitoredVehicleJourney.MonitoredCall.StopPointName[0].value;
  console.log(`
        Nom de station: ${stationName}
        Heure actuelle : ${new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
    `);

  for (let i = 0; i < stationData.length; i++) {
    const mvj = stationData[i].MonitoredVehicleJourney;
    const line = mvj.OperatorRef.value;
    const direction = mvj.DestinationName[0].value;
    const timeNext = new Date(mvj.MonitoredCall.ExpectedDepartureTime);
    const timeNow = new Date();
    const timeNextCountdown = (
      Math.abs(timeNext.getTime() - timeNow.getTime()) /
      (1000 * 60)
    ).toFixed(0);
    const minuteLabel = parseFloat(timeNextCountdown) > 1 ? 'minutes' : 'minute';

    console.log(`
        Ligne: ${line}
        Direction: ${direction}
        Prochain passage: ${timeNext.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })} (dans ${timeNextCountdown} ${minuteLabel})
        `);
  }
  res.send(JSON.stringify(data, null, 2));
});

export default router;
