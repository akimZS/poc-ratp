import "../__globals"
import { NextFunction, Request, Response } from "express"
import { dataLoader } from '../middleware';


export const stationsCatalogue = async (req: Request, res: Response, next: NextFunction) => {
    req.stationsCatalogue = await dataLoader();
    next();
};