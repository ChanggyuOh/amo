export interface ICommand {
    isVisual: boolean;
    execute();
    undo();
    redo();
}