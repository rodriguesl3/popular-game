import BoardEntity from "../entity/BoardEntity";

class GamesRepository {
  private static currentGames: BoardEntity[] = [];
  constructor() {    
    
  }

  static addNewGame(board: BoardEntity): boolean {
    GamesRepository.currentGames.push(board);
    return true;
  };
  static updateBoardGame(board: BoardEntity): boolean {
    const index = GamesRepository.currentGames.findIndex(elm => elm.id === board.id);
    GamesRepository.currentGames.splice(index, 1, board);
    return true;
  };
  static getBoardGameById(id: number): BoardEntity {
    return GamesRepository.currentGames.find(board => board.id === id);
  };
  static removeAllBoards(): boolean {
    GamesRepository.currentGames = [];
    return true;
  }

}

export default GamesRepository;