import { Request, Response } from 'express';
import * as cardRepository from '../repositories/cardRepository'
import * as cardServices from '../services/cardServices'

// import * as operacoesService from '../services/operacoesService';

export async function createCard(req: Request, res: Response) {
    const { employeeId, type } : {employeeId: number, type: string} = req.body;
    if (!employeeId || !type) {
        return res.sendStatus(422)
    }
    const card = await cardServices.createCard(employeeId, type)
    console.log(card)
    res.status(200).send({message: `estou na rota create card ${card}`})

}

export function listCards(req: Request, res: Response) {
    const { number, cardholderName, expirationDate } : {number: string, cardholderName: string, expirationDate: string } = req.body

    try {
        const cards = cardRepository.findByCardDetails(number, cardholderName, expirationDate)
        res.status(201).send(cards)
    } catch (error) {
        
    }

  res.status(200).send({message: 'estou na rota list card'})
}

// try {
//     let posts;

//     if (id) {
//       posts = await postsRepository.getUserPosts(id, userId);
//     } else {
//       posts = await postsRepository.getPosts(userId);
//     }

//     res.status(200).send(posts);
//   } catch (error) {
//     res.status(500).send(error);
//   }