import { INodeIO } from "./i-node-io";

export interface IFrameIO {
    kind?: "frame",
    label: string;
    nodes: (INodeIO | IFrameIO)[];
}