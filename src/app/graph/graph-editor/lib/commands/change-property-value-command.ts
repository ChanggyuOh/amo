import { GraphNodeProperty } from "../graph-node-property";
import { ICommand } from "./i-command";

export class ChangePropertyValueCommand implements ICommand {
    isVisual = false;
    oldValue: any;

    constructor(private property: GraphNodeProperty, private newValue: any) {
        this.oldValue = property.value;
    }

    execute() {
        this.property.setValue(this.newValue);
    }

    undo() {
        this.property.setValue(this.oldValue);
    }

    redo() {
        this.execute();
    }

}