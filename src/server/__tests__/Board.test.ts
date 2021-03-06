import Board from "../services/BoardService";
import IBoard from "../services/IBoardService";



describe('board validation', () => {

  test('create a board 2x2', () => {
    const instance: IBoard = new Board();
    const result = instance.buildBoard(2);
    const newBoard = result.state;

    expect(newBoard.length).toEqual(2);
    expect(newBoard[0].column.length).toEqual(2);
  });

  test('create a board 4x4', () => {
    const instance: IBoard = new Board();
    const result = instance.buildBoard(4);
    const newBoard = result.state;

    expect(newBoard.length).toEqual(4);
    expect(newBoard[0].column.length).toEqual(4);
  });

  test('create a board 6x6', () => {
    const instance: IBoard = new Board();
    const result = instance.buildBoard(6);
    const newBoard = result.state;

    expect(newBoard.length).toEqual(6);
    expect(newBoard[0].column.length).toEqual(6);
  });

  test('create an empty board []', () => {
    const instance: IBoard = new Board();
    const result = instance.buildBoard(-1);
    const newBoard = result.state;

    expect(newBoard.length).toEqual(0);
  });
});
