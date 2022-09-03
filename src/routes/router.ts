import { Router } from "express";
import cardsRouter from "./cardsRouter";
import transactionsRouter from "./transactionsRouter"
import rechargesRouter from "./rechargesRouter";
import paymentsRouter from "./paymentsRouter";

const router = Router();

router.use(cardsRouter);
router.use(transactionsRouter);
router.use(rechargesRouter);
router.use(paymentsRouter)

export default router;
