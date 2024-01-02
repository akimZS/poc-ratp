import { Platforms } from './parsing/platforms';


declare global {
  namespace Express {
    interface Request {
      stationsCatalogue: Platforms;
    }
  }
}
