"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Games_1 = __importDefault(require("../repository/Games"));
describe('check repository', function () {
    afterEach(function () {
        Games_1.default.removeAllBoards();
    });
    test('add new board', function () {
        var matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
        var newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix,
        };
        var result = Games_1.default.addNewGame(newBoard);
        expect(result).toEqual(true);
    });
    test("get by id", function () {
        var matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
        var newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix,
        };
        Games_1.default.addNewGame(newBoard);
        var board = Games_1.default.getBoardGameById(newBoard.id);
        expect(board.id).toEqual(newBoard.id);
    });
    test("updated boards", function () {
        var matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
        var newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix,
        };
        var updatedBoard = __assign(__assign({}, newBoard), { currentPosition: { 5: 2 } });
        Games_1.default.addNewGame(newBoard);
        Games_1.default.updateBoardGame(updatedBoard);
        var board = Games_1.default.getBoardGameById(newBoard.id);
        expect(board.currentPosition).toEqual({ 5: 2 });
    });
    test("remove all boards", function () {
        var matrix = [{ "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 2, "color": "#ff9400", "name": "orange" }] }, { "column": [{ "id": 2, "color": "#ff9400", "name": "orange" }, { "id": 3, "color": "#0000FF", "name": "blue" }] }];
        var newBoard = {
            id: 0,
            currentPosition: { 0: 0 },
            state: matrix,
        };
        Games_1.default.addNewGame(newBoard);
        Games_1.default.removeAllBoards();
        var board = Games_1.default.getBoardGameById(newBoard.id);
        expect(board).toBeUndefined();
    });
});
