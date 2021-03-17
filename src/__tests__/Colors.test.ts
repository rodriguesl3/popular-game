import ColorRange from "../entity/aggregation/Colors";

describe('board validation', () => {

  test('get random color', () => {
    const color = ColorRange.getRandomColor();
    const colorRegex = /^(red|orange|blue)$/;
    const isMatch = colorRegex.test(color.name);

    expect(isMatch).toEqual(true);
  })

});