"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.prisma = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
exports.prisma = prisma;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        logger_1.logger.info("Connected to PostgreSQL with Prisma");
    }
    catch (error) {
        logger_1.logger.error(error, "Database connection error:");
        process.exit(1);
    }
});
exports.connectDB = connectDB;
