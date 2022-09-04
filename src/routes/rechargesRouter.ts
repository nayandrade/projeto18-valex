import { Router } from "express";
import { cardRecharge } from "../controllers/rechargesControllers";
import keyMiddleware from "../middlewares/keyMiddleware"
import schemaValidator from "../middlewares/schemaValidator";
import { rechargeSchema } from "../schemas/schema"

const rechargesRouter = Router();

rechargesRouter.post("/recharges", schemaValidator(rechargeSchema), keyMiddleware, cardRecharge);

export default rechargesRouter;