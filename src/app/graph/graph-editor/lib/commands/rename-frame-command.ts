import { GraphNodeFrame } from "../graph-node-frame";
import { ICommand } from "./i-command";

export class RenameFrameCommand implements ICommand {
    isVisual = true;
    oldLabel: string;

    constructor(private frame: GraphNodeFrame, private newLabel: string) {
        this.oldLabel = frame.label;
    }

    execute() {
        this.frame.label = this.newLabel;
    }

    undo() {
        this.frame.label = this.oldLabel;
    }

    redo() {
        this.execute();
    }
}