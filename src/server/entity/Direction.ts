import DirectionEnum from "./aggregation/DirectionEnum";

class Direction {


  static getDirection(direction: string): DirectionEnum | null {
    switch (direction) {
      case "top":
        return DirectionEnum.top;
      case "down":
        return DirectionEnum.down;
      case "left":
        return DirectionEnum.left;
      case "right":
        return DirectionEnum.right;
      default:
        return null;
    }
  }
}

export default Direction;