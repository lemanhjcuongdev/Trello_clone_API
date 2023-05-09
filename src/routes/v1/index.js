/* eslint-disable quotes */
import express from "express";

import { HttpStatusCode } from "../../utilities/constants";
import { BoardRoutes } from "./board.route";
import { ColumnRoutes } from "./column.route";
import { CardRoutes } from "./card.route";

const route = express.Router();

route.get("/status", (req, res) =>
  res.status(HttpStatusCode.OK).json({ status: "OK" })
);

route.use("/boards", BoardRoutes);
route.use("/columns", ColumnRoutes);
route.use("/cards", CardRoutes);

export const apiV1 = route;
