"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server sent event router
const express_1 = require("express");
const sseController_1 = __importDefault(require("../controllers/sseController"));
const router = (0, express_1.Router)();
router.get('/', sseController_1.default.sendServerSendEvent);
exports.default = router;
