/* eslint-disable quotes */
import { CardModel } from "../models/card.model";
import { ColumnModel } from "../models/column.model";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);

    const columnId = newCard.columnId;
    const newCardId = newCard._id;

    //update order card in card array
    const updatedColumn = await ColumnModel.pushCardOrder(
      columnId.toString(),
      newCardId.toString()
    );

    return newCard;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;

    const result = await CardModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = {
  createNew,
  update,
};
