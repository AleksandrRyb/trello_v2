import express from "express";
import Board from "../models/board";
import List from "../models/list";
import Card from "../models/card";
import { protect } from "../middlewares/authorization";

function getBoardRoutes() {
  const router = express.Router();

  router.get("/", protect, getBoards);
  router.get("/:boardId", protect, getBoard);
  router.get("/:boardId/lists", protect, getLists);
  router.get("/:boardId/cards", protect, getCards);

  router.post("/", protect, addBoard);
  router.delete("/:boardId", protect, deleteBoard);
  router.put("/:boardId", protect, updateBoard);

  return router;
}
//GET BOARDS
async function getBoards(req, res, next) {
  try {
    const boards = await Board.find({ userId: req.userId });

    res.status(200).json(boards);
  } catch (error) {
    res.status(200).json({ message: "Can't find boards" });
  }
}
//GET BOARD
async function getBoard(req, res, next) {
  const _id = req.params.boardId;
  try {
    const board = await Board.findOne({ _id, userId: req.userId });
    if (!board) {
      res.status(404).json({});
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
}

//GET LISTS BASED ON BOARD ID
async function getLists(req, res, next) {
  const { boardId } = req.params;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res
        .status(404)
        .json({ message: "Board mistake, can not find board with existed id" });
    }

    const lists = await List.find({ boardId });

    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
}

async function getCards(req, res, next) {
  const { boardId } = req.params;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res
        .status(404)
        .json({ message: "Board mistake, can not find board with existed id" });
    }

    const cards = await Card.find({ boardId });

    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
}

//ADD BOARDS
async function addBoard(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "Empty fields not allowed!" });
  }

  try {
    const newBoard = await new Board(req.body).save();
    if (!newBoard) {
      return res.status(500).json({ message: "Something went wrong!" });
    }

    res.status(200).json({ newBoard });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
}

//UPDATE BOARD CONTENT BASED ON ID
async function updateBoard(req, res) {
  const _id = req.params.boardId;
  //Create array based on body keys
  const updates = Object.keys(req.body);
  //Alowed properties for updating
  const allowedUpdates = ["name", "image"];
  //Create new
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates" });
  }

  try {
    const board = await Board.findByIdAndUpdate(
      { _id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(400).json(error);
  }
}

//DELETE BOARD
async function deleteBoard(req, res) {
  try {
    let board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({
        message: `The board with id: ${req.params.boardId} does not exists`,
      });
    }

    if (req.userId != board.userId) {
      return res.status(403).json({
        message: `You do not have permissions to delete board: ${board.name}`,
      });
    }

    await board.delete();
    res.status(200).json({});
  } catch (error) {}
}

export { getBoardRoutes };
