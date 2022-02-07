import { GraphNode } from "../graph-node";
import { ICommand } from "./i-command";

export class ToggleCollapseCommand implements ICommand {
    isVisual = true;

    newCollapsed: boolean;

    constructor(private node: GraphNode) {
        this.newCollapsed = ! node.collapsed;
    }

    execute() {
        this.node.collapsed = this.newCollapsed;
    }

    undo() {
        this.node.collapsed = ! this.newCollapsed;
    }

    redo() {
        this.execute();
    }

}