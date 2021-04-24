import express from "express";
import Activity from "../models/activity";
import Board from "../models/board";
import { protect } from "../middlewares/authorization";

function getActivityRoutes() {
  const router = express.Router();

  router.post("/", protect, createActivity);
  router.delete("/:activityId", protect, deleteActivity);

  return router;
}

async function createActivity(req, res, next) {
  const { boardId } = req.body;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found!" });
    }
    const activity = await new Activity(req.body).save();
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
}

async function deleteActivity(req, res, next) {
  const { activityId } = req.params;
  try {
    const activity = await Activity.findByIdAndDelete(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found to delete!" });
    }

    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
}

export { getActivityRoutes };
