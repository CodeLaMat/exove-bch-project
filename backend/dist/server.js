"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// db
const connect_1 = __importDefault(require("./db/connect"));
//routers
const user_1 = __importDefault(require("./routes/user"));
const questions_1 = __importDefault(require("./routes/questions"));
const responses_1 = __importDefault(require("./routes/responses"));
const surveys_1 = __importDefault(require("./routes/surveys"));
//middleware
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const PORT = process.env.PORT || 5010;
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(`${process.env.JWT_SECRET}`));
app.get("/api/v1", (req, res) => {
    res.json({ msg: "API" });
});
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/responses", responses_1.default);
app.use("/api/v1/surveys", surveys_1.default);
app.use("/api/v1/questions", questions_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const start = async () => {
    try {
        await (0, connect_1.default)(`${process.env.MONGO_URL}`);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
