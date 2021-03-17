import DirectionEnum from "../entity/aggregation/DirectionEnum";
import GamesRepository from "../repository/Games";
import Board from "../services/Board";


// jest.mock('../repository/Games', () => ({
//   updateBoardGame: jest.fn().mockImplementation((board: BoardEntity) => true),
//   removeAllBoards: jest.fn().mockImplementation((board: BoardEntity) => true),
//   addNewGame: jest.fn().mockImplementation((board: BoardEntity) => true),
//   getBoardGameById: jest.fn().mockImplementation((boardId: number) => ({
//     id: 0,
//     currentPosition: { 0: 0 },
//     state: [{ "row": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "row": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }]
//   })),
// })
// );

describe('make moves', () => {

  let newBoard
  beforeEach(() => {
    const matrix = [{ "row": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "row": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
    newBoard = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix
    }
    GamesRepository.addNewGame(newBoard)
  });

  afterEach(() => {
    GamesRepository.removeAllBoards()
  })

  test('make first move to top', () => {

    const test = GamesRepository.getBoardGameById(0);

    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.top);
    expect(movement.currentPosition).toEqual({ 0: 0 });
  });
  test('make first move to right', () => {
    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.right);
    expect(movement.currentPosition).toEqual({ 0: 1 });
  });
  test('make first move to left', () => {
    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.left);
    expect(movement.currentPosition).toEqual({ 0: 0 });
  });
  test('make first move to down', () => {
    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.down);
    expect(movement.currentPosition).toEqual({ 1: 0 });
  });
})
