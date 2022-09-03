import { Router } from "express";
import { getTransactionsData } from "../controllers/transactionsControllers";

const transactionsRouter = Router();

transactionsRouter.get("/transactions/:id", getTransactionsData);

export default transactionsRouter;
