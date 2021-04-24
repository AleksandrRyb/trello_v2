import express from "express";
import Card from "../models/card";
import Board from "../models/board";
import { protect } from "../middlewares/authorization";

function getCardRoutes() {
  const router = express.Router();

  router.post("/", protect, createCard);
  router.get("/:cardId", protect, getCard);
  router.put("/:cardId", protect, updateCard);
  router.delete("/:cardId", protect, deleteCard);

  return router;
}

async function createCard(req, res, next) {
  try {
    const { boardId } = req.body;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found!" });
    }
    const card = await new Card(req.body).save();
    res.status(200).json(card);
  } catch (error) {
    next(card);
  }
}

//GET CARD BY ID
async function getCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "No card found!" });
    }

    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
}
//UPDATE CARD BY ID
async function updateCard(req, res, next) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "order"];
  //Check if user send wrong properties
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  //If so, stop function
  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    //Find card by params
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(cardId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!card) {
      return res.status(404).json({ message: "Card not found to update!" });
    }

    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found to delete!" });
    }

    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
}

export { getCardRoutes };
