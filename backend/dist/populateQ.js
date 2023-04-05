"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./db/connect"));
const questions_1 = __importDefault(require("./models/questions"));
const questionsV2_json_1 = __importDefault(require("./storage/questionsV2.json"));
const start = async () => {
    try {
        await (0, connect_1.default)(`${process.env.MONGO_URL}`);
        await questions_1.default.deleteMany();
        await questions_1.default.create(questionsV2_json_1.default);
        console.log("success!!");
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
