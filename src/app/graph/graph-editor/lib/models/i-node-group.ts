import { GraphNode } from "../graph-node";
import { GraphNodeFrame } from "../graph-node-frame";
import { ZoomState } from "../zoom-state";

export interface INodeGroup {
    nodes: GraphNode[];
    frames: GraphNodeFrame[];
    zoomState?: ZoomState;
}