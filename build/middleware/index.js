"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = void 0;
const unknownEndpoint = (req, res) => {
    res.status(404).json({ message: `Unknown endpoint ${req.originalUrl}` });
};
exports.unknownEndpoint = unknownEndpoint;
