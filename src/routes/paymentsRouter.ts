import { Router } from "express";
import { postPayment } from "../controllers/paymentsControllers";

const paymentsRouter = Router();

paymentsRouter.post("/payments", postPayment);

export default paymentsRouter;