import { Router } from 'express';
import { createCard, listCards } from '../controllers/cardsControllers'

const cardsRouter = Router();

cardsRouter.get("/cards", listCards);
cardsRouter.post("/cards", createCard);

export default cardsRouter;