/* eslint-disable quotes */
import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectId } from "mongodb";

const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(1).trim(),
  content: Joi.string().trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: new ObjectId(validatedValue.boardId),
      columnId: new ObjectId(validatedValue.columnId),
    };
    await getDB().collection(cardCollectionName).insertOne(insertValue);
    return insertValue;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAllCardOfColumn = async (idArray) => {
  try {
    const objectIdArray = idArray.map((id) => new ObjectId(id));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany(
        { _id: { $in: objectIdArray } },
        { $set: { _destroy: true } }
      );
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };
    if (updateData.boardId) updateData.boardId = new ObjectId(data.boardId);
    if (updateData.columnId) updateData.columnId = new ObjectId(data.columnId);

    const result = await getDB()
      .collection(cardCollectionName)
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

export const CardModel = {
  cardCollectionName,
  createNew,
  deleteAllCardOfColumn,
  update,
};
