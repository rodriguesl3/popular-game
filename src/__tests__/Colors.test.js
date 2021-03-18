"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ColorRange_1 = __importDefault(require("../entity/aggregation/ColorRange"));
describe('board validation', function () {
    test('get random color', function () {
        var color = ColorRange_1.default.getRandomColor();
        var colorRegex = /^(red|orange|blue)$/;
        var isMatch = colorRegex.test(color.name);
        expect(isMatch).toEqual(true);
    });
});
