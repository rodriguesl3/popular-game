import BoardEntity from "../entity/BoardEntity";

class GamesRepository {
  private static currentGames: BoardEntity[] = [];

  static addNewGame(board: BoardEntity): boolean {
    this.currentGames.push(board);
    return true;
  };
  static updateBoardGame(board: BoardEntity): boolean {
    const index = this.currentGames.findIndex(elm => elm.id === board.id);
    this.currentGames.splice(index, 1, board);
    return true;
  };
  static getBoardGameById(id: number): BoardEntity {
    return this.currentGames.find(board => board.id === id);
  };
  static removeAllBoards(): boolean {
    this.currentGames = [];
    return true;
  }

}

export default GamesRepository;