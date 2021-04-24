import express from "express";

import { getAuthRoutes } from "./auth.js";
import { getBoardRoutes } from "./board.js";
import { getListRoutes } from "./list";
import { getCardRoutes } from "./card";
import { getActivityRoutes } from "./activity";

function getRoutes() {
  const router = express.Router();

  router.use("/auth", getAuthRoutes());
  router.use("/board", getBoardRoutes());
  router.use("/list", getListRoutes());
  router.use("/card", getCardRoutes());
  router.use("/activity", getActivityRoutes());
  return router;
}

export { getRoutes };
