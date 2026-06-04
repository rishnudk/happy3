// routes/option.route.ts

import express from "express";
import { optionController } from "../config/container";
import { validate } from "../middlewares/validate.middleware";
import { UpdateOptionsSchema } from "../dtos/option.dto";

const optionRouter = express.Router();

optionRouter.put(
  "/:questionId",
  validate(UpdateOptionsSchema),
  optionController.updateOptions
);
optionRouter.delete(
  "/:questionId",
  optionController.deleteOptions
);

export default optionRouter;
