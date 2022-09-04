import { Router } from "express";
import {
  createCard,
  activateCard,
  lock,
  unlock,
} from "../controllers/cardsControllers";
import keyMiddleware from "../middlewares/keyMiddleware";
import createCardMiddleware from "../middlewares/createCardMiddleware";
import activateCardMiddleware from "../middlewares/activateCardMiddleware";
import schemaValidator from "../middlewares/schemaValidator";
import { createCardSchema, activateCardSchema, cardHanddlingSchema } from "../schemas/schema"

const cardsRouter = Router();

cardsRouter.post("/cards", schemaValidator(createCardSchema), keyMiddleware, createCardMiddleware, createCard);
cardsRouter.put("/cards", schemaValidator(activateCardSchema), activateCardMiddleware, activateCard);
cardsRouter.put("/cards/lock/:id", schemaValidator(cardHanddlingSchema), lock);
cardsRouter.put("/cards/unlock/:id", schemaValidator(cardHanddlingSchema), unlock);

export default cardsRouter;
