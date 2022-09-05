import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
import cardsRouter from "./routes/cardRouter";
import errorHandler from "./middlewares/errorHandler";

async function main() {
  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(json());

  app.use("/cards", cardsRouter);

  app.use(errorHandler);

  const PORT: number = Number(process.env.PORT || 3333);
  app.listen(PORT, () => {
    console.log(`O servidor subiu na porta ${PORT}.`);
  });
}
main().catch(console.error);
