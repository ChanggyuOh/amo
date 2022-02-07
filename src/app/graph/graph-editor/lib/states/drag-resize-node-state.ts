import { ResizeNodeCommand } from "../commands/resize-node-command";
import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { NodeView } from "../views/node-view";
import { State } from "./state";
import { IdleState } from "./idle-state";
import { ResizeNodeFeedback } from "./resize-node-feedback";

export class DragResizeNodeState extends State {

    feedback: ResizeNodeFeedback;

    constructor (editor: IEditor, private node: NodeView, startPoint: Point) {
        super();
        this.feedback = new ResizeNodeFeedback(node.bounds.origin, startPoint)
        editor.addFeedback(this.feedback);
        editor.draw();
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        this.feedback.update(event.position);
        editor.draw();
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        editor.emit(new ResizeNodeCommand(this.node.node, this.feedback.bounds.dimension));
        editor.removeFeedback(this.feedback);
        editor.draw();
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }
}