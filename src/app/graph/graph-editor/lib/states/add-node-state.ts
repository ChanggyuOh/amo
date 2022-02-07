import { AddNodeCommand } from "../commands/add-node-command";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { NodeView } from "../views/node-view";
import { NodeSelectionMode } from "../enums/node-selection-mode.enum";
import { snap, State } from "./state";
import { AddNodeFeedback } from "./add-node-feedback";
import { IdleState } from "./idle-state";

export class AddNodeState extends State {
    private feedback: AddNodeFeedback;

    constructor(editor: IEditor, private node: NodeView) {
        super();
        this.feedback = new AddNodeFeedback(node);
        editor.addFeedback(this.feedback);
        editor.draw();
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        this.node.moveTo(snap(event.position, event, editor.renderer.style.snapSize));
        this.node.layoutNode(editor.renderer);
        editor.draw();
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        editor.removeFeedback(this.feedback);
        editor.emit(new AddNodeCommand(editor.nodeGroup, this.node.node));
        editor.select([ editor.nodeViews.find(nv => nv.node === this.node.node) ], NodeSelectionMode.REPLACE);
        editor.draw();
        return new IdleState();
    }

    handleKeyUp(editor: IEditor, event: IEvent): State {
        if (event.key === 'Escape') {
            editor.removeFeedback(this.feedback);
            editor.draw();
            return new IdleState();
        }
        return this;
    }

}