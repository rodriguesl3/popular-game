import DirectionEnum from "../entity/aggregation/DirectionEnum";
import Matrix from "../entity/aggregation/Matrix";
import BoardEntity from "../entity/BoardEntity";

interface IBoard {
  buildBoard(size: number): BoardEntity;
  makeMove(board: number, position: number[], direction: DirectionEnum): BoardEntity;
}

export default IBoard