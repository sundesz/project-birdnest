"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const config_1 = require("./config");
const sseRoute_1 = __importDefault(require("./routes/sseRoute"));
const droneRoute_1 = __importDefault(require("./routes/droneRoute"));
const middleware_1 = require("./middleware");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.get('/', (_req, res) => {
    res.send('<h1>Project birdnest</h1>');
});
app.use('/events', sseRoute_1.default);
app.use('/drones', droneRoute_1.default);
app.use('/birdnest', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: config_1.API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/birdnest`]: '',
    },
}));
app.use(middleware_1.unknownEndpoint);
app.use(errorHandler_1.errorHandler);
exports.default = app;
