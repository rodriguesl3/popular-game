import DirectionEnum from "../entity/aggregation/DirectionEnum";
import Matrix from "../entity/aggregation/Matrix";
import BoardEntity from "../entity/BoardEntity";
import GamesRepository from "../repository/Games";
import Board from "../services/BoardService";

describe('make moves', () => {

  let newBoard: BoardEntity;

  beforeEach(() => {
    const matrix: Matrix[] = [{
      "column": [
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 2, "color": "#ff9400", "name": "orange" }]
    }, {
      "column": [
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 3, "color": "#0000FF", "name": "blue" }]
    }];
    newBoard = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix
    }
    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);
    jest.spyOn(GamesRepository, 'removeAllBoards').mockReturnValue(true);
    jest.spyOn(GamesRepository, 'addNewGame').mockReturnValue(true);
    jest.spyOn(GamesRepository, 'updateBoardGame').mockReturnValue(true);

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('make first move to top', () => {
    const test = GamesRepository.getBoardGameById(0);

    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.top);
    expect(movement!.currentPosition).toEqual({ 0: 0 });
    expect(movement!.previousPosition).toEqual({ 0: 0 });
  });

  test('make first move to right', () => {
    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.right);
    expect(movement!.currentPosition).toEqual({ 0: 1 });
    expect(movement!.previousPosition).toEqual({ 0: 0 });
  });
  test('make first move to left', () => {
    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.left);
    expect(movement!.currentPosition).toEqual({ 0: 0 });
    expect(movement!.previousPosition).toEqual({ 0: 0 });
  });
  test('make first move to down', () => {
    const instance = new Board();
    const movement = instance.makeMove(newBoard.id, DirectionEnum.down);
    expect(movement!.currentPosition).toEqual({ 1: 0 });
    expect(movement!.previousPosition).toEqual({ 0: 0 });
  });
})

describe('calculate colors 2x2', () => {
  let newBoard: BoardEntity;

  beforeEach(() => {
    const matrix: Matrix[] = [{
      "column": [
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 2, "color": "#ff9400", "name": "orange" }]
    }, {
      "column": [
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 2, "color": "#ff9400", "name": "orange" }]
    }];
    newBoard = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix
    }
    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);
    jest.spyOn(GamesRepository, 'removeAllBoards').mockReturnValue(true);
    jest.spyOn(GamesRepository, 'addNewGame').mockReturnValue(true);
    jest.spyOn(GamesRepository, 'updateBoardGame').mockReturnValue(true);

  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  test('first move - all blue', () => {
    newBoard.state = [{
      "column": [
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 2, "color": "#ff9400", "name": "orange" }]
    }, {
      "column": [
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 2, "color": "#ff9400", "name": "orange" }]
    }];

    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);

    const instance = new Board();
    const firstMove = instance.makeMove(newBoard.id, DirectionEnum.down);
    const boardResponse = instance.calculateColors(firstMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('blue');
    expect(boardResponse.state[1].column[0].name).toEqual('blue');
  })


  test('second move - all orange', () => {
    newBoard.state = [{
      "column": [
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 2, "color": "#ff9400", "name": "orange" },
      ]
    }, {
      "column": [
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 2, "color": "#ff9400", "name": "orange" },
      ]
    }];

    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);

    const instance = new Board();
    const firstMove = instance.makeMove(newBoard.id, DirectionEnum.down);
    let boardResponse = instance.calculateColors(firstMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('blue');
    expect(boardResponse.state[1].column[0].name).toEqual('blue');


    const secondMove = instance.makeMove(firstMove!.id, DirectionEnum.right);
    boardResponse = instance.calculateColors(secondMove!);
    expect(boardResponse.state[0].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[0].name).toEqual('orange');
    expect(boardResponse.state[0].column[1].name).toEqual('orange');
    expect(boardResponse.state[1].column[1].name).toEqual('orange');
  })
})


describe('calculate colors 4x4 for multiples moves', () => {
  const matrix: Matrix[] = [
    {
      "column": [
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 1, "color": "#ff0000", "name": "red" }
      ]
    },
    {
      "column": [
        { "id": 1, "color": "#ff0000", "name": "red" },
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 1, "color": "#ff0000", "name": "red" }
      ]
    },
    {
      "column": [
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 1, "color": "#ff0000", "name": "red" },
        { "id": 1, "color": "#ff0000", "name": "red" },
        { "id": 3, "color": "#0000FF", "name": "blue" }
      ]
    },
    {
      "column": [
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 3, "color": "#0000FF", "name": "blue" },
        { "id": 2, "color": "#ff9400", "name": "orange" },
        { "id": 1, "color": "#ff0000", "name": "red" }]
    }];

  beforeEach(() => {
    // const newBoard = {
    //   id: 0,
    //   currentPosition: { 0: 0 },
    //   state: matrix
    // }

    //jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);
    jest.spyOn(GamesRepository, 'removeAllBoards').mockReturnValue(true);
    jest.spyOn(GamesRepository, 'addNewGame').mockReturnValue(true);
    jest.spyOn(GamesRepository, 'updateBoardGame').mockReturnValue(true);

  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  test.skip('first move - getting red', () => {
    const newBoard = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix
    }

    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);

    const instance = new Board();
    const firstMove = instance.makeMove(newBoard.id, DirectionEnum.down);
    const boardResponse = instance.calculateColors(firstMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('red');
    expect(boardResponse.state[1].column[0].name).toEqual('red');
  })

  test.skip('second move - getting orange', () => {
    const orangeBoard = {
      id: 0,
      currentPosition: { 0: 0 },
      state: matrix
    }

    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(orangeBoard);

    const instance = new Board();
    const firstMove = instance.makeMove(orangeBoard.id, DirectionEnum.down);
    let boardResponse = instance.calculateColors(firstMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('red');
    expect(boardResponse.state[1].column[0].name).toEqual('red');


    const secondMove = instance.makeMove(firstMove!.id, DirectionEnum.right);
    boardResponse = instance.calculateColors(secondMove!);
    expect(boardResponse.state[0].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[1].name).toEqual('orange');
  })

  test.skip('third move - getting blue', () => {
    const blueBoard = {
      id: 1,
      currentPosition: { 0: 0 },
      state: matrix
    }

    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(blueBoard);

    const instance = new Board();
    const firstMove = instance.makeMove(blueBoard.id, DirectionEnum.down);
    let boardResponse = instance.calculateColors(firstMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('red');
    expect(boardResponse.state[1].column[0].name).toEqual('red');


    const secondMove = instance.makeMove(firstMove!.id, DirectionEnum.right);
    boardResponse = instance.calculateColors(secondMove!);
    expect(boardResponse.state[0].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[1].name).toEqual('orange');


    const thirdMove = instance.makeMove(secondMove!.id, DirectionEnum.right);
    boardResponse = instance.calculateColors(thirdMove!);
    expect(boardResponse.state[0].column[0].name).toEqual('blue');
    expect(boardResponse.state[0].column[2].name).toEqual('blue');
    expect(boardResponse.state[1].column[0].name).toEqual('blue');
    expect(boardResponse.state[1].column[1].name).toEqual('blue');
  })


  test('fourth move - getting red', () => {
    const redBoard = {
      id: 2,
      currentPosition: { 0: 0 },
      state: matrix
    }

    jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(redBoard);

    const instance = new Board();
    const firstMove = instance.makeMove(redBoard.id, DirectionEnum.down);
    let boardResponse = instance.calculateColors(firstMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('red');
    expect(boardResponse.state[1].column[0].name).toEqual('red');


    const secondMove = instance.makeMove(firstMove!.id, DirectionEnum.right);
    boardResponse = instance.calculateColors(secondMove!);
    expect(boardResponse.state[0].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[0].name).toEqual('orange');
    expect(boardResponse.state[1].column[1].name).toEqual('orange');


    const thirdMove = instance.makeMove(secondMove!.id, DirectionEnum.right);
    boardResponse = instance.calculateColors(thirdMove!);
    expect(boardResponse.state[0].column[0].name).toEqual('blue');
    expect(boardResponse.state[1].column[0].name).toEqual('blue');
    expect(boardResponse.state[1].column[1].name).toEqual('blue');
    expect(boardResponse.state[0].column[2].name).toEqual('blue');

    const fourthMove = instance.makeMove(thirdMove!.id, DirectionEnum.down);
    boardResponse = instance.calculateColors(fourthMove!);

    expect(boardResponse.state[0].column[0].name).toEqual('red');
    expect(boardResponse.state[0].column[1].name).toEqual('red');
    expect(boardResponse.state[0].column[2].name).toEqual('red');
    expect(boardResponse.state[0].column[3].name).toEqual('red');

    expect(boardResponse.state[1].column[0].name).toEqual('red');
    expect(boardResponse.state[1].column[1].name).toEqual('red');
    expect(boardResponse.state[1].column[2].name).toEqual('red');
    expect(boardResponse.state[1].column[3].name).toEqual('red');

    expect(boardResponse.state[2].column[0].name).toEqual('red');
    expect(boardResponse.state[2].column[1].name).toEqual('red');
    expect(boardResponse.state[2].column[2].name).toEqual('red');
    expect(boardResponse.state[2].column[3].name).toEqual('blue');
  })



})