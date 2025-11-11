import "dotenv/config";
import { createApp } from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/task-manager");
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
};

start();
