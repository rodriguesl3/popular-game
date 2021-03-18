import DirectionEnum from "../entity/aggregation/DirectionEnum";
import Matrix from "../entity/aggregation/Matrix";
import BoardEntity from "../entity/BoardEntity";

interface IBoard {
  buildBoard(size: number): BoardEntity;
  makeMove(board: number, direction: DirectionEnum): BoardEntity | null;
  calculateColors(board: BoardEntity): BoardEntity;
  getBoardById(boardId: number): BoardEntity | undefined;
}

export default IBoard