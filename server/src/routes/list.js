import express, { response } from "express";
import List from "../models/list";
import Card from "../models/card";
import Board from "../models/board";
import { protect } from "../middlewares/authorization";

function getListRoutes() {
  const router = express.Router();

  router.post("/", protect, createList);
  router.get("/:listId", protect, getList);
  router.put("/:listId", protect, updateList);
  router.delete("/:listId", protect, deleteList);

  return router;
}

async function createList(req, res, next) {
  try {
    const { boardId } = req.body;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.json(404).json({
        message: "Cant create new list, an unexpected board related error",
      });
    }

    const list = await new List(req.body).save();
    res.status(200).json(list);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
      next(error);
    }
  }
}

//Get single list besed on id
async function getList(req, res, next) {
  const { listId } = req.params;
  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(400).json({ message: "Can not get list" });
    }

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

async function getCardsByListId(req, res, next) {
  const { listId } = req.params;
  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List is not found!" });
    }
    const cards = await Card.find(listId);
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
}

//Update list  route
async function updateList(req, res, next) {
  const _id = req.params.listId;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "order"];
  const isValidOperaton = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperaton) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const list = await List.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!list) {
      return res.status(404).json({ message: "List not found!" });
    }

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

async function deleteList(req, res, next) {
  const { listId } = req.params;
  try {
    //FindByIdAndDelete finds object and delete it from db but it still will be till the end in const list
    const list = await List.findByIdAndDelete(listIds);
    if (!list) {
      return res.status(404).json({ message: "List not found!" });
    }
    const cards = await Card.find({ listId });

    //find all card within list and delete them all
    cards.forEach(async (card) => await Card.deleteOne({ _id: card._id }));
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

export { getListRoutes };
