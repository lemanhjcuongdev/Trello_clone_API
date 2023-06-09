/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";

import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(1).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    await getDB().collection(boardCollectionName).insertOne(value);
    return value;
  } catch (error) {
    throw new Error(error);
  }
};

const pushColumnOrder = async (boardId, newColumnId) => {
  try {
    await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(boardId) },
        { $push: { columnOrder: newColumnId } },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, // COLLECTION_NAME
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, // COLLECTION_NAME
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data };

    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = { createNew, pushColumnOrder, getFullBoard, update };
