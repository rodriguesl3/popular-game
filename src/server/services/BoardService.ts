import GamesRepository from "../repository/Games";
import ColorRange, { ColorType } from "../entity/aggregation/ColorRange";
import DirectionEnum from "../entity/aggregation/DirectionEnum";
import BoardEntity from "../entity/BoardEntity";
import IBoardService from "./IBoardService";


class BoardService implements IBoardService {
  getBoardById(boardId: number): BoardEntity | undefined {
    return GamesRepository.getBoardGameById(boardId);
  }
  buildBoard(size: number): BoardEntity {
    const newBoard = new BoardEntity();
    if (size > 0) {
      for (let row = 0; row < size; row++) {
        const cellRow: ColorType[] = [];
        for (let column = 0; column < size; column++) {
          cellRow.push(ColorRange.getRandomColor());
        }
        newBoard.state.push({ column: cellRow });
      }
    }
    newBoard.currentPosition = { 0: 0 };
    GamesRepository.addNewGame(newBoard);
    return newBoard;
  }
  makeMove(boardId: number, direction: DirectionEnum): BoardEntity | null {
    const board = GamesRepository.getBoardGameById(boardId);
    if (!board) {
      return null;
    }

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
        newColumnPosition = calc < 0 ? +value : calc;
        break
    }
    this.updateCurrentPosition(board, { [+newRowPosition]: +newColumnPosition });
    return board;
  }

  private updateCurrentPosition(board: BoardEntity, position: { [key: number]: number }) {
    board.previousPosition = board.currentPosition;
    board.currentPosition = position;
    GamesRepository.updateBoardGame(board);
    return board;
  }

  calculateColors(board: BoardEntity): any {
    const [[currRow, currColumn]] = Object.entries(board.currentPosition);
    const [[prevRow, prevColumn]] = Object.entries(board.previousPosition!);
    

    const currentColor = { ...board.state[+currRow].column[+currColumn] };
    const prevColor = { ...board.state[+prevRow].column[+prevColumn] };

    for (let rowIndex = +currRow; rowIndex >= 0; rowIndex--) {
      const rowElement = board.state[rowIndex];
      for (let colIndex = +currColumn; colIndex >= 0; colIndex--) {
        const colElement = rowElement.column[colIndex];
        if (colElement.id === prevColor.id) {
          rowElement.column[colIndex] = currentColor;
        }
      }
    }

    GamesRepository.updateBoardGame(board);

    return board;
  }
}

export default BoardService;