import { Router } from "express";
import { createCard } from "../controllers/cardsControllers";
import keyMiddleware from "../middlewares/keyMiddleware"

const cardsRouter = Router();

cardsRouter.post("/cards", keyMiddleware, createCard);

export default cardsRouter;
