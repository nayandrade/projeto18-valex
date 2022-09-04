import { Router } from "express";
import { postPayment } from "../controllers/paymentsControllers";
import schemaValidator from "../middlewares/schemaValidator";
import { paymentschema } from "../schemas/schema"

const paymentsRouter = Router();

paymentsRouter.post("/payments", schemaValidator(paymentschema), postPayment);

export default paymentsRouter;