import { NextFunction, RequestHandler, Response } from 'express';
import { SSE_INTERVAL } from '../config';
import { IPilot } from '../types/types';
import droneController from './droneController';

const sendServerSendEvent: RequestHandler = async (
  _req,
  res,
  next: NextFunction
) => {
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const sseId = new Date().toLocaleTimeString();

    const drones = await droneController.fetchDroneData();
    if (drones !== null) {
      writeServerSendEvent(res, sseId, drones);
    }

    setInterval(async function () {
      const drones = await droneController.fetchDroneData();
      if (drones !== null) {
        writeServerSendEvent(res, sseId, drones);
      }
    }, SSE_INTERVAL);
  } catch (error: unknown) {
    next(error);
  }
};

const writeServerSendEvent = (
  res: Response,
  sseId: string,
  data: {
    snapShotTime: string;
    pilots: IPilot[];
  }
) => {
  res.write('id: ' + sseId + '\n');
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

export default { sendServerSendEvent };
