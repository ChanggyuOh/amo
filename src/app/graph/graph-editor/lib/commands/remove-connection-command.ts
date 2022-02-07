import { GraphNodeConnection } from "../graph-node-connection";
import { ICommand } from "./i-command";

export class RemoveConnectionCommand implements ICommand {
    isVisual = false;
    constructor(private connection: GraphNodeConnection) {}

    execute() {
        this.redo();
    }

    undo() {
        this.connection.connect();
    }

    redo() {
        this.connection.disconnect();
    }

}