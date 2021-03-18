import { ColorType } from "./aggregation/ColorRange";
import Matrix from "./aggregation/Matrix";

class BoardEntity {
  id: number;
  state: Matrix[];
  currentPosition: { [key: number]: number };
  previousPosition?: { [key: number]: number };

  constructor() {
    this.id = new Date().getTime();
    this.state = [];
    this.currentPosition = {};
  }
}

export default BoardEntity;