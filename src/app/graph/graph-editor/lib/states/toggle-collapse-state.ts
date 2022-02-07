import { ToggleCollapseCommand } from "../commands/toggle-collapse-command";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { NodeView } from "../views/node-view";
import { State } from "./state";
import { IdleState } from "./idle-state";

export class ToggleCollapseState extends State {
    constructor(private node: NodeView) {
        super();
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        editor.emit(new ToggleCollapseCommand(this.node.node));
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }

}