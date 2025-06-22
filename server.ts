import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/router";
import { errorHandler } from "./src/middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`🚀 PORT: ${process.env.PORT || 3000}`);
});
