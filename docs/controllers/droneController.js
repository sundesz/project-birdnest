"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const axios_1 = __importDefault(require("axios"));
const fast_xml_parser_1 = require("fast-xml-parser");
const helper_1 = require("../helper");
const utils_1 = require("../utils");
let pilotData = [];
const fetchDroneData = () => __awaiter(void 0, void 0, void 0, function* () {
    const returnParameter = {
        snapShotTime: new Date().toISOString(),
        pilots: [],
    };
    try {
        const droneResponse = yield axios_1.default.get('http://localhost:5001/birdnest/drones');
        if (droneResponse.status !== 200)
            return returnParameter;
        const droneXML = droneResponse.data;
        const options = {
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
        };
        const xmlJSONData = new fast_xml_parser_1.XMLParser(options).parse(droneXML).report
            .capture;
        const allDrones = xmlJSONData.drone.map((drone) => {
            return (0, utils_1.toDroneNewEntry)(drone, xmlJSONData['@_snapshotTimestamp']);
        });
        // drones voilating ndz
        const ndzDrones = (0, helper_1.dronesIn100m_range)(allDrones);
        const pilots = yield fetchPilotData(ndzDrones);
        pilotData = lodash_1.default.unionBy(pilots, pilotData, 'pilotId');
        return Object.assign(Object.assign({}, returnParameter), { pilots });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return returnParameter;
    }
});
const fetchPilotData = (drones) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Promise.all(drones.map((drone) => __awaiter(void 0, void 0, void 0, function* () {
            const isPilotDataExists = lodash_1.default.find(pilotData, {
                drone: { serialNumber: drone.serialNumber },
            });
            let newPilotData;
            // Only fetch pilot-data if not found else update the existing one
            if (isPilotDataExists) {
                newPilotData = Object.assign(Object.assign({}, isPilotDataExists), { drone });
            }
            else {
                const pilotResponse = yield axios_1.default.get(`http://localhost:5001/birdnest/pilots/${drone.serialNumber}`);
                const jsonData = pilotResponse.data;
                const pilot = (0, utils_1.toPilotNewEntry)(jsonData, drone);
                newPilotData = Object.assign(Object.assign({}, pilot), { drone });
            }
            return newPilotData;
        })));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return [];
    }
});
const getDrones = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drones = yield fetchDroneData();
        res.json(drones);
    }
    catch (error) {
        next(error);
    }
});
exports.default = { fetchDroneData, getDrones };
