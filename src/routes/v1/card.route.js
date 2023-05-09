/* eslint-disable quotes */
import express from "express";

import { CardController } from "../../controller/card.controller";
import { CardValidation } from "../../validations/card.validation";

const route = express.Router();

route.route("/").post(CardValidation.createNew, CardController.createNew);
route.route("/:id").put(CardValidation.update, CardController.update);

export const CardRoutes = route;
