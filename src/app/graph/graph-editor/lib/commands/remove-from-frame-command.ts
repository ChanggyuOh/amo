import { Framable } from "../framable";
import { GraphNodeFrame } from "../graph-node-frame";
import { ICommand } from "./i-command";

export class RemoveFromFrameCommand implements ICommand {
    isVisual = true;
    oldParents = new Map<Framable, GraphNodeFrame>();

    constructor(private nodes: Framable[]) {
        nodes.forEach(node => {
            this.oldParents.set(node, node.parent);
        })
    }

    execute() {
        this.nodes.forEach(node => node.addToFrame(null));
    }

    undo() {
        this.nodes.forEach(node => node.addToFrame(this.oldParents.get(node)));
    }

    redo() {
        this.execute();
    }
}