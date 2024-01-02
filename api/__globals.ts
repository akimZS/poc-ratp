import { Platforms } from './parsing/platforms';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Express {
    interface Request {
      stationsCatalogue: Platforms;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export interface Error {
    status?: number;
    message: string;
  }
}
