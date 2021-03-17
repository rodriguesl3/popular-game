import Matrix from "../entity/aggregation/Matrix";
import BoardEntity from "../entity/BoardEntity";

interface IBoard{
  buildBoard(size:number):BoardEntity;
}

export default IBoard