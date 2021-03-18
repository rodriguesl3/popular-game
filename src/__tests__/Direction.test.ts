import DirectionEnum from "../entity/aggregation/DirectionEnum"
import Direction from "../entity/Direction";

describe('test direction', () => {
  test('get direction to right', () => {
    const expected = DirectionEnum.right;

    const result = Direction.getDirection("right");

    expect(result).toStrictEqual(expected);
  })
  test('get direction to left', () => {
    const expected = DirectionEnum.left;

    const result = Direction.getDirection("left");

    expect(result).toStrictEqual(expected);
  })
  test('get direction to top', () => {
    const expected = DirectionEnum.top;

    const result = Direction.getDirection("top");

    expect(result).toStrictEqual(expected);
  })
  test('get direction to down', () => {
    const expected = DirectionEnum.down;

    const result = Direction.getDirection("down");

    expect(result).toStrictEqual(expected);
  })
})