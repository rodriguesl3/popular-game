import Matrix from "./aggregation/Matrix";

class BoardEntity {
  id: number;
  state: Matrix[];

  constructor() {
    this.id = new Date().getTime();
    this.state = [];
  }
}

export default BoardEntity;