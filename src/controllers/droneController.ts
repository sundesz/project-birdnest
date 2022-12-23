import _ from 'lodash';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { dronesIn100m_range } from '../helper';
import { NextFunction, RequestHandler } from 'express';
import { toDroneNewEntry, toPilotNewEntry } from '../utils';
import { IDrone, IDroneResponse, IPilot, IPilotField } from '../types/types';
import { PORT } from '../config';

let pilotData: IPilot[] = [];

const fetchDroneData = async () => {
  const returnParameter = {
    snapShotTime: new Date().toISOString(),
    pilots: [],
  };

  try {
    const droneResponse = await axios.get(
      `http://localhost:${PORT}/birdnest/drones`
    );
    if (droneResponse.status !== 200) return returnParameter;

    const droneXML = droneResponse.data as string;

    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    };

    const xmlJSONData = new XMLParser(options).parse(droneXML).report
      .capture as IDroneResponse;

    const allDrones = xmlJSONData.drone.map((drone) => {
      return toDroneNewEntry(drone, xmlJSONData['@_snapshotTimestamp']);
    });

    // drones voilating ndz
    const ndzDrones = dronesIn100m_range(allDrones);

    const pilots = await fetchPilotData(ndzDrones);

    pilotData = _.unionBy(pilots, pilotData, 'pilotId');

    return { ...returnParameter, pilots };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return returnParameter;
  }
};

const fetchPilotData = async (drones: IDrone[]) => {
  try {
    return await Promise.all(
      drones.map(async (drone) => {
        const isPilotDataExists = _.find(pilotData, {
          drone: { serialNumber: drone.serialNumber },
        });

        let newPilotData: IPilot;

        // Only fetch pilot-data if not found else update the existing one
        if (isPilotDataExists) {
          newPilotData = { ...isPilotDataExists, drone };
        } else {
          const pilotResponse = await axios.get(
            `http://localhost:${PORT}/birdnest/pilots/${drone.serialNumber}`
          );
          const jsonData = pilotResponse.data as IPilotField;

          const pilot = toPilotNewEntry(jsonData, drone);
          newPilotData = { ...pilot, drone };
        }

        return newPilotData;
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  }
};

const getDrones: RequestHandler = async (_req, res, next: NextFunction) => {
  try {
    const drones = await fetchDroneData();
    res.json(drones);
  } catch (error: unknown) {
    next(error);
  }
};

export default { fetchDroneData, getDrones };
