import { IFrameIO } from "./i-frame-io";
import { INodeConnectionIO } from "./i-node-connection-io";
import { INodeIO } from "./i-node-io";

export interface INodeGroupIO {
    nodes: (INodeIO | IFrameIO)[];
    connections: INodeConnectionIO[];
    canvas?: {
        position: { x: number, y: number },
        zoom: number;
    }
}