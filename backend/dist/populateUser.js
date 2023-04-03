"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./db/connect"));
const user_1 = __importDefault(require("./models/user"));
const Users_json_1 = __importDefault(require("./storage/Users.json"));
const start = async () => {
    try {
        await (0, connect_1.default)(`${process.env.MONGO_URL}`);
        await user_1.default.deleteMany();
        await user_1.default.create(Users_json_1.default);
        console.log("success!!");
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
