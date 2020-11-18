import { Router } from "express";
import {
  createTracking,
  deleteTrackingById,
  getAllTrackings,
  getTrackingById,
  UpdateTrackingById,
} from "../controller/tracking.controller";

export const trackingRouter = Router({ mergeParams: true });

trackingRouter.get("/", getAllTrackings);

trackingRouter.get("/:trackingId", getTrackingById);

trackingRouter.post("/", createTracking);

trackingRouter.patch("/:trackingId", UpdateTrackingById);

trackingRouter.delete("/:trackingId", deleteTrackingById);
