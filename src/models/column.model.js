/* eslint-disable quotes */
import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";

const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(1).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: new ObjectId(validatedValue.boardId),
    };
    await getDB().collection(columnCollectionName).insertOne(insertValue);
    return insertValue;
  } catch (error) {
    throw new Error(error);
  }
};

const pushCardOrder = async (columnId, newCardId) => {
  try {
    await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: new ObjectId(columnId) },
        { $push: { cardOrder: newCardId } },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };
    if (updateData.boardId) updateData.boardId = new ObjectId(data.boardId);

    const result = await getDB()
      .collection(columnCollectionName)
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

export const ColumnModel = {
  columnCollectionName,
  createNew,
  pushCardOrder,
  update,
};
