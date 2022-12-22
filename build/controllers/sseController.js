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
const config_1 = require("../config");
const droneController_1 = __importDefault(require("./droneController"));
const sendServerSendEvent = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });
        const sseId = new Date().toLocaleTimeString();
        const drones = yield droneController_1.default.fetchDroneData();
        if (drones !== null) {
            writeServerSendEvent(res, sseId, drones);
        }
        setInterval(function () {
            return __awaiter(this, void 0, void 0, function* () {
                const drones = yield droneController_1.default.fetchDroneData();
                if (drones !== null) {
                    writeServerSendEvent(res, sseId, drones);
                }
            });
        }, config_1.SSE_INTERVAL);
    }
    catch (error) {
        next(error);
    }
});
const writeServerSendEvent = (res, sseId, data) => {
    res.write('id: ' + sseId + '\n');
    res.write(`data: ${JSON.stringify(data)}\n\n`);
};
exports.default = { sendServerSendEvent };
