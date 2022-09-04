import { Router } from "express";
import { getDetaildBalance } from "../controllers/transactionsControllers";

const transactionsRouter = Router();

transactionsRouter.get("/transactions/:id", getDetaildBalance);

export default transactionsRouter;
