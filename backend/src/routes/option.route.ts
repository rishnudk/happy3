// routes/option.route.ts

import express from "express";
import optionController from "../controller/option.controller";

const optionRouter = express.Router();

optionRouter.put(
  "/updateOptions/:questionId",
  optionController.updateOptions
);
optionRouter.delete(
  "/deleteOptions/:questionId",
  optionController.deleteOptions
);

export default optionRouter;
