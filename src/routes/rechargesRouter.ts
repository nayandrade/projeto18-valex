import { Router } from "express";
import { cardRecharge } from "../controllers/rechargesControllers";
import keyMiddleware from "../middlewares/keyMiddleware"

const rechargesRouter = Router();

rechargesRouter.post("/recharges", keyMiddleware, cardRecharge);

export default rechargesRouter;