import Matrix from "../entity/aggregation/Matrix";
import IBoard from "./IBoard";


class Board implements IBoard {
  buildBoard(size: number): Matrix {
    throw new Error("Method not implemented.");
  }
}

export default Board;