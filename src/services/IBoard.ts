import Matrix from "../entity/aggregation/Matrix";

interface IBoard{
  buildBoard(size:number):Matrix;
}

export default IBoard