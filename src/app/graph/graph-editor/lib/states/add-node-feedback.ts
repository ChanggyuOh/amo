import { IEditor } from "../models/i-editor";
import { IVisualFeedback } from "../models/i-visual-feedback";
import { NodeView } from "../views/node-view";

export class AddNodeFeedback implements IVisualFeedback {
    foreground = true;

    constructor(private node: NodeView) {}

    draw(editor: IEditor) {
        this.node.draw(editor);
    }

}