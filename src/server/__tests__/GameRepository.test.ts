import BoardEntity from "../entity/BoardEntity";
import GamesRepository from "../repository/Games";

describe('check repository', () => {
  afterEach(() => {
    GamesRepository.removeAllBoards();
  })
  test('add new board', () => {
    const matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
    const newBoard: BoardEntity = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix,
    }
    const result = GamesRepository.addNewGame(newBoard);
    expect(result).toEqual(true);
  })

  test("get by id", () => {
    const matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
    const newBoard: BoardEntity = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix,
    }
    GamesRepository.addNewGame(newBoard);
    const board = GamesRepository.getBoardGameById(newBoard.id);
    expect(board!.id).toEqual(newBoard.id);
  })

  test("updated boards", () => {
    const matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
    const newBoard: BoardEntity = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix,
    }

    const updatedBoard = { ...newBoard, currentPosition: { 5: 2 } };

    GamesRepository.addNewGame(newBoard);
    GamesRepository.updateBoardGame(updatedBoard)
    const board = GamesRepository.getBoardGameById(newBoard.id);
    expect(board!.currentPosition).toEqual({ 5: 2 })
  })

  test("remove all boards", () => {
    const matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
    const newBoard: BoardEntity = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix,
    }
    GamesRepository.addNewGame(newBoard);
    GamesRepository.removeAllBoards();
    const board = GamesRepository.getBoardGameById(newBoard.id);
    expect(board).toBeUndefined();
  })
})