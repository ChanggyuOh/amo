import { ICommand } from "./i-command";

export class CompositeCommand implements ICommand {
    isVisual = false; // TODO also test composite
    constructor(private commands: ICommand[]) {}

    execute() {
        this.commands.forEach(command => command.execute());
    }

    undo() {
        this.commands.forEach(command => command.undo());
    }

    redo() {
        this.commands.forEach(command => command.redo());
    }

}
