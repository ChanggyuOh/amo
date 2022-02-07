import { GraphNode } from "../graph-node";
import { INodeGroup } from "../models/i-node-group";
import { ICommand } from "./i-command";

export class AddNodeCommand implements ICommand {
    isVisual = false;
    constructor(private nodeGroup: INodeGroup, private node: GraphNode) {}

    execute() {
        this.redo();
    }

    undo() {
        const pos = this.nodeGroup.nodes.indexOf(this.node);
        this.nodeGroup.nodes.splice(pos, 1);
    }

    redo() {
        this.nodeGroup.nodes.push(this.node);
    }

}