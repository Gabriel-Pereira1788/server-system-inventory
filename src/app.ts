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
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await db();

  console.log("Aplicação funcionando na porta:" + PORT);
});
