/* eslint-disable quotes */
import Joi from "joi";

import { HttpStatusCode } from "../utilities/constants";

const createNew = async (req, res, next) => {
  const conditions = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(1).trim(),
    content: Joi.string().trim().min(0),
  });

  try {
    await conditions.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      error: new Error(err).message,
    });
  }
};

const update = async (req, res, next) => {
  const conditions = Joi.object({
    title: Joi.string().min(1).trim(),
    boardId: Joi.string(),
    columnId: Joi.string(),
  });

  try {
    await conditions.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      error: new Error(err).message,
    });
  }
};

export const CardValidation = {
  createNew,
  update,
};
