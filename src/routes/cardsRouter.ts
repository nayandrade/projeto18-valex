import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardsControllers";
import keyMiddleware from "../middlewares/keyMiddleware"

const cardsRouter = Router();

cardsRouter.post("/cards", keyMiddleware, createCard);
cardsRouter.put("/cards", activateCard);

export default cardsRouter;
