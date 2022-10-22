require("dotenv").config();
import express from "express";
import config from "config";
import cors from "cors";
import router from "./routes/router";
import morganMiddleware from "./middlewares/morganMiddleware";
import db from "../config/db";
const app = express();

app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use("/api", router);

const port = config.get<number>("port");

app.listen(port, async () => {
  await db();

  console.log("Aplicação funcionando na porta:" + port);
});
