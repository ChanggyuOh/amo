import { Dimension } from "../geometry/dimension";
import { GraphNode } from "../graph-node";
import { ICommand } from "./i-command";

export class ResizeNodeCommand implements ICommand {
    isVisual = true;
    oldWidth: number;

    constructor(private node: GraphNode, private dimension: Dimension) {
        this.oldWidth = node.fullWidth;
    }

    execute() {
        this.node.fullWidth = this.dimension.width;
    }

    undo() {
        this.node.fullWidth = this.oldWidth;
    }

    redo() {
        this.execute();
    }

}