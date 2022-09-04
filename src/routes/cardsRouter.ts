import { Router } from "express";
import { createCard, activateCard, lock, unlock } from "../controllers/cardsControllers";
import keyMiddleware from "../middlewares/keyMiddleware"
import createCardMiddleware from "../middlewares/createCardMiddleware";
import activateCardMiddleware from "../middlewares/activateCardMiddleware"

const cardsRouter = Router();

cardsRouter.post("/cards", keyMiddleware, createCardMiddleware, createCard);
cardsRouter.put("/cards", activateCardMiddleware, activateCard);
cardsRouter.put("/cards/lock/:id", lock)
cardsRouter.put("/cards/unlock/:id", unlock)

export default cardsRouter;
