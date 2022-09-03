import { Router } from "express";
import cardsRouter from "./cardsRouter";
import transactionsRouter from "./transactionsRouter"

const router = Router();

router.use(cardsRouter);
router.use(transactionsRouter);

export default router;
