import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import router from "./src/router";
import { errorHandler } from "./src/middleware/errorHandler";
import { initializeSocket } from "./src/utils/socket";

dotenv.config();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

// Initialize Socket.IO
initializeSocket(httpServer);

httpServer.listen(process.env.PORT || 3000, async () => {
  console.log(`🚀 PORT: ${process.env.PORT || 3000}`);
});
