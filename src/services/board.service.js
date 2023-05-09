/* eslint-disable quotes */
import { BoardModel } from "../models/board.model";
import { cloneDeep } from "lodash";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.getFullBoard(id);

    const cloneBoard = cloneDeep(board);
    //remove destroyed column
    cloneBoard.columns = board.columns.filter((column) => !column._destroy);

    //Add card to each col, remove destroyed card
    cloneBoard.columns.forEach((col) => {
      col.cards = cloneBoard.cards.filter(
        (card) =>
          card.columnId.toString() === col._id.toString() && !card._destroy
      );
    });

    //remove list cards below
    delete cloneBoard.cards;

    return cloneBoard;
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
    if (updateData.columns) delete updateData.columns;

    const result = await BoardModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard, update };
