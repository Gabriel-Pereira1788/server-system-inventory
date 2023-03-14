"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const stream = {
    write: (message) => console.log(message),
};
const skip = () => {
    const env = config_1.default.get("env") || "devolpment";
    return env !== "development";
};
const morganMiddleware = (0, morgan_1.default)(":method:url :status : res[content-length] - response-time ms", { stream, skip });
exports.default = morganMiddleware;
