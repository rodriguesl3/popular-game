import { Request, Response, NextFunction, Router } from 'express';
import { throws } from 'node:assert';
import { NOTIMP } from 'node:dns';

import IController from "./IController";

class GameController implements IController{
  public path = '/posts';
  public router = Router();

  
}

export default GameController;