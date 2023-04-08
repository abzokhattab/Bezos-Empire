require("dotenv").config();

import express from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";
import db from "./services/DatabaseConnection";

db();
const app = express();
app.use(express.json());
app.use(morgan("tiny") as express.RequestHandler);
app.use(cors());

app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
