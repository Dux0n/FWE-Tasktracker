import { Router, Request, Response } from "express";
import { labelRouter } from "./label.router";
import { taskRouter } from "./task.router";
import { trackingRouter } from "./tracking.router";

export const globalRouter = Router({ mergeParams: true });

globalRouter.get("/", async (_: Request, res: Response) => {
  res.send({ message: "Hello api" });
});

globalRouter.use("/task", taskRouter);
globalRouter.use("/label", labelRouter);
globalRouter.use("/tracking", trackingRouter);