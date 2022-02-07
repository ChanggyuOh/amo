import { IEditor } from "./i-editor";

export interface IVisualFeedback {
    foreground?: boolean;
    draw(editor: IEditor);
}