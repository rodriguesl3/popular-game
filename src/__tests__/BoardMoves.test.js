"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionEnum_1 = __importDefault(require("../entity/aggregation/DirectionEnum"));
var Games_1 = __importDefault(require("../repository/Games"));
var BoardService_1 = __importDefault(require("../services/BoardService"));
describe('make moves', function () {
    var newBoard;
    beforeEach(function () {
        var matrix = [{
                "column": [
                    { "id": 2, "color": "#ff9400", "name": "orange" },
                    { "id": 2, "color": "#ff9400", "name": "orange" }
                ]
            }, {
                "column": [
                    { "id": 2, "color": "#ff9400", "name": "orange" },
                    { "id": 3, "color": "#0000FF", "name": "blue" }
                ]
            }];
        newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix
        };
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(newBoard);
        jest.spyOn(Games_1.default, 'removeAllBoards').mockReturnValue(true);
        jest.spyOn(Games_1.default, 'addNewGame').mockReturnValue(true);
        jest.spyOn(Games_1.default, 'updateBoardGame').mockReturnValue(true);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    test('make first move to top', function () {
        var test = Games_1.default.getBoardGameById(0);
        var instance = new BoardService_1.default();
        var movement = instance.makeMove(newBoard.id, DirectionEnum_1.default.top);
        expect(movement.currentPosition).toEqual({ 0: 0 });
        expect(movement.previousPosition).toEqual({ 0: 0 });
    });
    test('make first move to right', function () {
        var instance = new BoardService_1.default();
        var movement = instance.makeMove(newBoard.id, DirectionEnum_1.default.right);
        expect(movement.currentPosition).toEqual({ 0: 1 });
        expect(movement.previousPosition).toEqual({ 0: 0 });
    });
    test('make first move to left', function () {
        var instance = new BoardService_1.default();
        var movement = instance.makeMove(newBoard.id, DirectionEnum_1.default.left);
        expect(movement.currentPosition).toEqual({ 0: 0 });
        expect(movement.previousPosition).toEqual({ 0: 0 });
    });
    test('make first move to down', function () {
        var instance = new BoardService_1.default();
        var movement = instance.makeMove(newBoard.id, DirectionEnum_1.default.down);
        expect(movement.currentPosition).toEqual({ 1: 0 });
        expect(movement.previousPosition).toEqual({ 0: 0 });
    });
});
describe('calculate colors 2x2', function () {
    var newBoard;
    beforeEach(function () {
        var matrix = [{
                "column": [
                    { "id": 2, "color": "#ff9400", "name": "orange" },
                    { "id": 2, "color": "#ff9400", "name": "orange" }
                ]
            }, {
                "column": [
                    { "id": 3, "color": "#0000FF", "name": "blue" },
                    { "id": 2, "color": "#ff9400", "name": "orange" }
                ]
            }];
        newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix
        };
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(newBoard);
        jest.spyOn(Games_1.default, 'removeAllBoards').mockReturnValue(true);
        jest.spyOn(Games_1.default, 'addNewGame').mockReturnValue(true);
        jest.spyOn(Games_1.default, 'updateBoardGame').mockReturnValue(true);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    test('first move - all blue', function () {
        newBoard.state = [{
                "column": [
                    { "id": 2, "color": "#ff9400", "name": "orange" },
                    { "id": 2, "color": "#ff9400", "name": "orange" }
                ]
            }, {
                "column": [
                    { "id": 3, "color": "#0000FF", "name": "blue" },
                    { "id": 2, "color": "#ff9400", "name": "orange" }
                ]
            }];
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(newBoard);
        var instance = new BoardService_1.default();
        var firstMove = instance.makeMove(newBoard.id, DirectionEnum_1.default.down);
        var boardResponse = instance.calculateColors(firstMove);
        expect(boardResponse.state[0].column[0].name).toEqual('blue');
        expect(boardResponse.state[1].column[0].name).toEqual('blue');
    });
    test('second move - all orange', function () {
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
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(newBoard);
        var instance = new BoardService_1.default();
        var firstMove = instance.makeMove(newBoard.id, DirectionEnum_1.default.down);
        var boardResponse = instance.calculateColors(firstMove);
        expect(boardResponse.state[0].column[0].name).toEqual('blue');
        expect(boardResponse.state[1].column[0].name).toEqual('blue');
        var secondMove = instance.makeMove(firstMove.id, DirectionEnum_1.default.right);
        boardResponse = instance.calculateColors(secondMove);
        expect(boardResponse.state[0].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[0].name).toEqual('orange');
        expect(boardResponse.state[0].column[1].name).toEqual('orange');
        expect(boardResponse.state[1].column[1].name).toEqual('orange');
    });
});
describe('calculate colors 4x4 for multiples moves', function () {
    var matrix = [
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
                { "id": 1, "color": "#ff0000", "name": "red" }
            ]
        }
    ];
    beforeEach(function () {
        // const newBoard = {
        //   id: 0,
        //   currentPosition: { 0: 0 },
        //   state: matrix
        // }
        //jest.spyOn(GamesRepository, 'getBoardGameById').mockReturnValue(newBoard);
        jest.spyOn(Games_1.default, 'removeAllBoards').mockReturnValue(true);
        jest.spyOn(Games_1.default, 'addNewGame').mockReturnValue(true);
        jest.spyOn(Games_1.default, 'updateBoardGame').mockReturnValue(true);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    test.skip('first move - getting red', function () {
        var newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix
        };
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(newBoard);
        var instance = new BoardService_1.default();
        var firstMove = instance.makeMove(newBoard.id, DirectionEnum_1.default.down);
        var boardResponse = instance.calculateColors(firstMove);
        expect(boardResponse.state[0].column[0].name).toEqual('red');
        expect(boardResponse.state[1].column[0].name).toEqual('red');
    });
    test.skip('second move - getting orange', function () {
        var orangeBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix
        };
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(orangeBoard);
        var instance = new BoardService_1.default();
        var firstMove = instance.makeMove(orangeBoard.id, DirectionEnum_1.default.down);
        var boardResponse = instance.calculateColors(firstMove);
        expect(boardResponse.state[0].column[0].name).toEqual('red');
        expect(boardResponse.state[1].column[0].name).toEqual('red');
        var secondMove = instance.makeMove(firstMove.id, DirectionEnum_1.default.right);
        boardResponse = instance.calculateColors(secondMove);
        expect(boardResponse.state[0].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[1].name).toEqual('orange');
    });
    test.skip('third move - getting blue', function () {
        var blueBoard = {
            id: 1,
            currentPosition: { 0: 0 },
            state: matrix
        };
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(blueBoard);
        var instance = new BoardService_1.default();
        var firstMove = instance.makeMove(blueBoard.id, DirectionEnum_1.default.down);
        var boardResponse = instance.calculateColors(firstMove);
        expect(boardResponse.state[0].column[0].name).toEqual('red');
        expect(boardResponse.state[1].column[0].name).toEqual('red');
        var secondMove = instance.makeMove(firstMove.id, DirectionEnum_1.default.right);
        boardResponse = instance.calculateColors(secondMove);
        expect(boardResponse.state[0].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[1].name).toEqual('orange');
        var thirdMove = instance.makeMove(secondMove.id, DirectionEnum_1.default.right);
        boardResponse = instance.calculateColors(thirdMove);
        expect(boardResponse.state[0].column[0].name).toEqual('blue');
        expect(boardResponse.state[0].column[2].name).toEqual('blue');
        expect(boardResponse.state[1].column[0].name).toEqual('blue');
        expect(boardResponse.state[1].column[1].name).toEqual('blue');
    });
    test('fourth move - getting red', function () {
        var redBoard = {
            id: 2,
            currentPosition: { 0: 0 },
            state: matrix
        };
        jest.spyOn(Games_1.default, 'getBoardGameById').mockReturnValue(redBoard);
        var instance = new BoardService_1.default();
        var firstMove = instance.makeMove(redBoard.id, DirectionEnum_1.default.down);
        var boardResponse = instance.calculateColors(firstMove);
        expect(boardResponse.state[0].column[0].name).toEqual('red');
        expect(boardResponse.state[1].column[0].name).toEqual('red');
        var secondMove = instance.makeMove(firstMove.id, DirectionEnum_1.default.right);
        boardResponse = instance.calculateColors(secondMove);
        expect(boardResponse.state[0].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[0].name).toEqual('orange');
        expect(boardResponse.state[1].column[1].name).toEqual('orange');
        var thirdMove = instance.makeMove(secondMove.id, DirectionEnum_1.default.right);
        boardResponse = instance.calculateColors(thirdMove);
        expect(boardResponse.state[0].column[0].name).toEqual('blue');
        expect(boardResponse.state[1].column[0].name).toEqual('blue');
        expect(boardResponse.state[1].column[1].name).toEqual('blue');
        expect(boardResponse.state[0].column[2].name).toEqual('blue');
        var fourthMove = instance.makeMove(thirdMove.id, DirectionEnum_1.default.down);
        boardResponse = instance.calculateColors(fourthMove);
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
    });
});
