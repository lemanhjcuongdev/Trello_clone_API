/* eslint-disable quotes */
import express from "express";

import { ColumnController } from "../../controller/column.controller";
import { ColumnValidation } from "../../validations/column.validation";

const route = express.Router();

route.route("/").post(ColumnValidation.createNew, ColumnController.createNew);
route.route("/:id").put(ColumnValidation.update, ColumnController.update);

export const ColumnRoutes = route;
