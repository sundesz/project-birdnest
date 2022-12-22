"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const droneController_1 = __importDefault(require("../controllers/droneController"));
const router = (0, express_1.Router)();
router.get('/', droneController_1.default.getDrones);
exports.default = router;
