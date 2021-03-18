import { Request, Response, NextFunction, Router } from 'express';
import { throws } from 'node:assert';
import { NOTIMP } from 'node:dns';
import Direction from '../entity/Direction';
import BoardService from '../services/BoardService';
import IBoardService from '../services/IBoardService';

import IController from "./IController";

class GameController implements IController {
  public path = '/game';
  public router = Router();

  constructor() {
    this.buildGameRoutes();
  }

  private buildGameRoutes() {
    this.router.post(`${this.path}/:size`, this.buildBoard);
    this.router.get(`${this.path}/:id`, this.getBoard);
    this.router.put(`${this.path}/:id/direction/:direction`, this.makeMove);
  }


  private getBoard(request: Request, response: Response, next: NextFunction) {
    //TODO: USER INVERSIFY TO AVOID COUPLED CODE.
    const _boardService = new BoardService();
    const boardId = request.params.id;

    const boardResult = _boardService.getBoardById(+boardId);
    response.status(200).send({ data: boardResult });
  }

  private buildBoard(request: Request, response: Response, next: NextFunction) {

    //TODO: USER INVERSIFY TO AVOID COUPLED CODE.
    const _boardService = new BoardService();

    const boardSize = request.params.size;

    if (!boardSize && isNaN(+boardSize) && +boardSize % 2 === 0) {
      response.status(400).send({ error: "Invalid board size number, it needs to be an even number." });
    }

    const newBoard = _boardService.buildBoard(+boardSize);
    response.status(201).send({ data: newBoard });
  }

  private makeMove(request: Request, response: Response, next: NextFunction) {
    //TODO: USER INVERSIFY TO AVOID COUPLED CODE.
    const _boardService = new BoardService();
    const boardId = request.params.id;
    const side = request.params.direction;

    const direction = Direction.getDirection(side);
    if (direction === null) {
      response.status(400).send({ error: "Invalid direction" });
      return;
    }

    const currentBoard = _boardService.getBoardById(+boardId);
    const newBoard = _boardService.makeMove(+boardId, direction);
    if (!newBoard) {
      response.status(404).send({ error: "Board not found" });
      return;
    }
    const updatedBoard = _boardService.calculateColors(newBoard);
    response.status(200).send({ data: updatedBoard });
  }
}



export default GameController;