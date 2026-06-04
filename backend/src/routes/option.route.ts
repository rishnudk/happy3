// routes/option.route.ts

import express from "express";
import optionController from "../controller/option.controller";
import { validate } from "../middlewares/validate.middleware";
import { UpdateOptionsSchema } from "../dtos/option.dto";

const optionRouter = express.Router();

optionRouter.put(
  "/updateOptions/:questionId",
  validate(UpdateOptionsSchema),
  optionController.updateOptions
);
optionRouter.delete(
  "/deleteOptions/:questionId",
  optionController.deleteOptions
);

export default optionRouter;
