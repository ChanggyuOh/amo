import { GraphNodeConnection } from "../graph-node-connection";
import { GraphNodeProperty } from "../graph-node-property";
import { ICommand } from "./i-command";

export class CreateConnectionCommand implements ICommand {
    isVisual = false;
    connection: GraphNodeConnection;

    constructor(private fromProperty: GraphNodeProperty, private toProperty: GraphNodeProperty) {}

    execute() {
        this.connection = new GraphNodeConnection(this.fromProperty, this.toProperty);
        this.connection.connect();
    }

    undo() {
        this.connection.disconnect();
    }

    redo() {
        this.connection.connect();
    }

}
