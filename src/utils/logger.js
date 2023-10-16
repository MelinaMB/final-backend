import winston from "winston";
import path from "path";
import { __dirname} from "../utils.js";

const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/deverrors.log"),
            level: "info",
            format: winston.format.colorize({ all: true }),
        }),
    ],
});

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
            filename:path.join(__dirname, "../logs/proderrors.log"),
            level: "info",
            format: winston.format.colorize({ all: true }),
        }),
    ],
});

export const addLogger = (req, res, next) => {
    const environment = process.env.NODE_ENV || 'DEVELOPMENT';
    if (environment === 'PRODUCTION') {
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    next();
};