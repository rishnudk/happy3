import "dotenv/config";
import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";
import app from "./app";
import { logger } from "./utils/logger";

connectDB();

app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
