/* eslint-disable quotes */
import express from "express";

import { BoardController } from "../../controller/board.controller";
import { BoardValidation } from "../../validations/board.validation";

const route = express.Router();

route.route("/").post(BoardValidation.createNew, BoardController.createNew);
route
  .route("/:id")
  .get(BoardController.getFullBoard)
  .put(BoardValidation.update, BoardController.update);

export const BoardRoutes = route;
