/* eslint-disable quotes */
import express from "express";
import cors from "cors";

import { connectDB, getDB } from "./src/config/mongodb.js";
import { env } from "./src/config/environment.js";
import { BoardModel } from "./src/models/board.model.js";
import { apiV1 } from "./src/routes/v1/index.js";
import { corsOptions } from "./src/config/cors.js";

connectDB()
  .then(() => console.log("CONNECT DATABASE SUCCESSFULLY!"))
  .then(() => startServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const startServer = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/v1", apiV1);
  app.listen(env.PORT, env.HOSTNAME, () => {
    console.log("Listening on port: " + env.PORT);
  });
};
