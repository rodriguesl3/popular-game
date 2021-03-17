import GamesRepository from "../repository/Games";
import Cell from "../entity/aggregation/Cell";
import ColorRange from "../entity/aggregation/ColorRange";
import DirectionEnum from "../entity/aggregation/DirectionEnum";
import BoardEntity from "../entity/BoardEntity";
import IBoard from "./IBoard";


class Board implements IBoard {
  calculateColors(board: BoardEntity): BoardEntity {
    throw new Error("Method not implemented.");
  }
  buildBoard(size: number): BoardEntity {
    const newBoard = new BoardEntity();
    if (size > 0) {
      for (let row = 0; row < size; row++) {
        const cellRow: Cell[] = [];
        for (let column = 0; column < size; column++) {
          cellRow.push(ColorRange.getRandomColor());
        }
        newBoard.state.push({ row: cellRow });
      }
    }
    newBoard.currentPosition = { 0: 0 };
    GamesRepository.addNewGame(newBoard);
    return newBoard;
  }
  makeMove(boardId: number, direction: DirectionEnum): BoardEntity {
    const board = GamesRepository.getBoardGameById(boardId);
    const [[key, value]] = Object.entries(board.currentPosition);
    let newRowPosition: number = +key;
    let newColumnPosition: number = +value;
    let calc: number;
    switch (direction) {
      case DirectionEnum.top:
        calc = (+key) - 1;
        newRowPosition = calc < 0 ? +key : calc;
        break
      case DirectionEnum.right:
        calc = (+value) + 1;
        newColumnPosition = calc < 0 ? +value : calc;
        break
      case DirectionEnum.down:
        calc = (+key) + 1;
        newRowPosition = calc < 0 ? +key : calc;
        break
      case DirectionEnum.left:
        calc = (+value) - 1;
        newRowPosition = calc < 0 ? +value : calc;
        break
    }
    this.updateCurrentPosition(board, { [+newRowPosition]: +newColumnPosition });
    return board;
  }

  private updateCurrentPosition(board: BoardEntity, position: { [key: number]: number }) {
    board.currentPosition = position;
    GamesRepository.updateBoardGame(board);
    return board;
  }
}

export default Board;