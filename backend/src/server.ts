import "dotenv/config";
import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";
import app from "./app";

connectDB();

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
