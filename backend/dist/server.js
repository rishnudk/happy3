"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const env_config_1 = require("./config/env.config");
const db_config_1 = require("./config/db.config");
const app_1 = __importDefault(require("./app"));
(0, db_config_1.connectDB)();
app_1.default.listen(env_config_1.env.PORT, () => {
    console.log(`Server is running on port ${env_config_1.env.PORT}`);
});
