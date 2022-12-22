"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _req, res, next) => {
    console.log(error);
    switch (error.name) {
        default:
            return res.status(400).json({ message: error.message });
    }
    next(error);
};
exports.errorHandler = errorHandler;
