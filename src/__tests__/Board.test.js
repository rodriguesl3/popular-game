"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BoardService_1 = __importDefault(require("../services/BoardService"));
describe('board validation', function () {
    test('create a board 2x2', function () {
        var instance = new BoardService_1.default();
        var result = instance.buildBoard(2);
        var newBoard = result.state;
        expect(newBoard.length).toEqual(2);
        expect(newBoard[0].column.length).toEqual(2);
    });
    test('create a board 4x4', function () {
        var instance = new BoardService_1.default();
        var result = instance.buildBoard(4);
        var newBoard = result.state;
        expect(newBoard.length).toEqual(4);
        expect(newBoard[0].column.length).toEqual(4);
    });
    test('create a board 6x6', function () {
        var instance = new BoardService_1.default();
        var result = instance.buildBoard(6);
        var newBoard = result.state;
        expect(newBoard.length).toEqual(6);
        expect(newBoard[0].column.length).toEqual(6);
    });
    test('create an empty board []', function () {
        var instance = new BoardService_1.default();
        var result = instance.buildBoard(-1);
        var newBoard = result.state;
        expect(newBoard.length).toEqual(0);
    });
});
