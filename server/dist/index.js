"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require("cors");
const fs = require("fs");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use(cors());
app.use(express_1.default.json());
app.post("/getuser", (req, res) => {
    try {
        const data = fs.readFileSync(__dirname + "/info.json");
        const users = JSON.parse(data);
        const foundUser = users.find((item) => {
            if (item.email === req.body.email) {
                return item;
            }
        });
        setTimeout(() => {
            res.send(foundUser);
        }, 5000);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error reading file");
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
