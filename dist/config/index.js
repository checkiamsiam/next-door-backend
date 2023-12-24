"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    isDevelopment: process.env.NODE_ENV === "development",
    port: process.env.PORT || 5000,
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
    },
};
exports.default = config;
