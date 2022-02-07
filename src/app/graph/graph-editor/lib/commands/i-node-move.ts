import { Point } from "../geometry/point";
import { GraphNode } from "../graph-node";

export interface INodeMove {
    node: GraphNode;
    startPosition: Point;
    endPosition: Point;
}
