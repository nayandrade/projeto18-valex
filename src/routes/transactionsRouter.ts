import { Router } from "express";
import { getDetaildBalance } from "../controllers/transactionsControllers";
import getBallanceMiddleware from "../middlewares/getBalanceMiddleware";

const transactionsRouter = Router();

transactionsRouter.get(
  "/transactions/:id",
  getBallanceMiddleware,
  getDetaildBalance
);

export default transactionsRouter;
