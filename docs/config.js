"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSE_INTERVAL = exports.API_SERVICE_URL = exports.PORT = void 0;
const utils_1 = require("./utils");
exports.PORT = process.env.PORT || 5001;
exports.API_SERVICE_URL = (0, utils_1.parseString)('http://assignments.reaktor.com/birdnest');
exports.SSE_INTERVAL = 5 * 1000;
