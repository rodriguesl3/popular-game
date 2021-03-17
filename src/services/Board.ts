import Cell from "../entity/aggregation/Cell";
import ColorRange from "../entity/aggregation/Colors";
import Matrix from "../entity/aggregation/Matrix";
import BoardEntity from "../entity/BoardEntity";
import IBoard from "./IBoard";


class Board implements IBoard {
  buildBoard(size: number): BoardEntity {
    const newBoard = new BoardEntity();
    if(size > 0){
      for (let row = 0; row < size; row++) {
        const cellRow: Cell[] = [];
        for (let column = 0; column < size; column++) {
          cellRow.push(ColorRange.getRandomColor());
        }
        newBoard.state.push({ row: cellRow });
      }
    }
    return newBoard;
  }
}

export default Board;