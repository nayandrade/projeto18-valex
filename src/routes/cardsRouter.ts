import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardsControllers";
import keyMiddleware from "../middlewares/keyMiddleware"
import createCardMiddleware from "../middlewares/createCardMiddleware";
import activateCardMiddleware from "../middlewares/activateCardMiddleware"

const cardsRouter = Router();

cardsRouter.post("/cards", keyMiddleware, createCardMiddleware, createCard);
cardsRouter.put("/cards", activateCardMiddleware, activateCard);

export default cardsRouter;
