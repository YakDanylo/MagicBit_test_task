import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
const fs = require("fs");
const path = require("path");
dotenv.config();

const app: Express = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.post("/getuser", (req: Request, res: Response) => {
  const number = req.body.number.replace("-", "").replace("-", "");
  try {
    const data = fs.readFileSync(path.join(__dirname, "info.json"));
    const users = JSON.parse(data);
    const foundUser = users.find((item: { email: string; number: string }) => {
      if (item.email === req.body.email) {
        return item;
      }
      if (item.number === number) {
        return item;
      }
    });

    setTimeout(() => {
      res.send(foundUser);
    }, 5000);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error reading file");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
