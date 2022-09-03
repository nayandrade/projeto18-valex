import { Router } from "express";
import cardsRouter from "./cardsRouter";
import transactionsRouter from "./transactionsRouter"
import rechargesRouter from "./rechargesRouter";

const router = Router();

router.use(cardsRouter);
router.use(transactionsRouter);
router.use(rechargesRouter);

export default router;
