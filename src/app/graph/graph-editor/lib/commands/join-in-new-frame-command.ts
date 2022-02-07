import { Framable } from "../framable";
import { GraphNodeFrame } from "../graph-node-frame";
import { INodeGroup } from "../models/i-node-group";
import { ICommand } from "./i-command";

export class JoinInNewFrameCommand implements ICommand {
    isVisual = true;
    frame: GraphNodeFrame;
    oldParents = new Map<Framable, GraphNodeFrame>();

    constructor(private nodeGroup: INodeGroup, private nodes: Framable[]) {
        this.frame = new GraphNodeFrame("Frame");
        nodes.forEach(node => this.oldParents.set(node, node.parent));
    }

    execute() {
        this.nodeGroup.frames.push(this.frame);
        this.nodes.forEach(node => node.addToFrame(this.frame));
    }

    undo() {
        this.oldParents.forEach((frame, node) => node.addToFrame(frame));
        this.nodeGroup.frames.splice(this.nodeGroup.frames.indexOf(this.frame), 1);
    }

    redo() {
        this.execute();
    }
}