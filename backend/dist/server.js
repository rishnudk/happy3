"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_config_1 = require("./config/db.config");
const app_1 = __importDefault(require("./app"));
(0, db_config_1.connectDB)();
app_1.default.listen(5000, () => {
    console.log("Server is running on port 5000");
});
