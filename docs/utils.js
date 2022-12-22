"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPilotNewEntry = exports.toDroneNewEntry = exports.parseNumber = exports.parseString = void 0;
const helper_1 = require("./helper");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (text) => {
    // also need to check for NaN
    return typeof text === 'number' || text instanceof Number;
};
const parseString = (text) => {
    if (!text || !isString(text)) {
        throw new Error('not a string');
    }
    return text;
};
exports.parseString = parseString;
const parseNumber = (text) => {
    if (!text || !isNumber(text)) {
        throw new Error(`${text} is not a number`);
    }
    return text;
};
exports.parseNumber = parseNumber;
// we need only serialNumber and coordinates so ignoring other parameters
const toDroneNewEntry = ({ serialNumber, positionY, positionX }, snapShotTime) => {
    const posX = (0, exports.parseNumber)(positionX);
    const posY = (0, exports.parseNumber)(positionY);
    const distanceInMeter = (0, helper_1.distanceInMeterFromCenter)(posX, posY);
    return {
        serialNumber: (0, exports.parseString)(serialNumber),
        positionX: posX,
        positionY: posY,
        lastSeen: (0, exports.parseString)(snapShotTime),
        distanceInMeter,
    };
};
exports.toDroneNewEntry = toDroneNewEntry;
const toPilotNewEntry = ({ pilotId, firstName, lastName, phoneNumber, createdDt, email }, drone) => ({
    pilotId: (0, exports.parseString)(pilotId),
    name: `${(0, exports.parseString)(firstName)} ${(0, exports.parseString)(lastName)}`,
    phoneNumber: (0, exports.parseString)(phoneNumber),
    createdDt: (0, exports.parseString)(createdDt),
    email: (0, exports.parseString)(email),
    drone,
});
exports.toPilotNewEntry = toPilotNewEntry;
