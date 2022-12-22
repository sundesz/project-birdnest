"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceInMeterFromCenter = exports.dronesIn100m_range = void 0;
const CENTER_COORDINATE = { x: 250000, y: 250000 };
const dronesIn100m_range = (drones) => {
    return drones.filter((drone) => drone.distanceInMeter <= 100);
};
exports.dronesIn100m_range = dronesIn100m_range;
const distanceInMeterFromCenter = (x, y) => {
    const distance = Math.sqrt(Math.pow(x - CENTER_COORDINATE.x, 2) + Math.pow(y - CENTER_COORDINATE.y, 2));
    return distance / 1000;
};
exports.distanceInMeterFromCenter = distanceInMeterFromCenter;
