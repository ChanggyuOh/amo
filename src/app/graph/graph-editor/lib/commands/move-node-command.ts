import { ICommand } from "./i-command";
import { INodeMove } from "./i-node-move";

export class MoveNodeCommand implements ICommand {
    isVisual = true;

    constructor(private moves: INodeMove[]) {}

    execute() {
        this.moves.forEach(move => {
            move.node.location = move.endPosition;
        });
    }

    undo() {
        this.moves.forEach(move => {
            move.node.location = move.startPosition;
        });
    }

    redo() {
        this.execute();
    }

}