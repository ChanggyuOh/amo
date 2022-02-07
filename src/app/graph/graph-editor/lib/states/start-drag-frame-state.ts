import { RenameFrameCommand } from "../commands/rename-frame-command";
import { CommonValueType } from "../value/common-value-type.enum";
import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { NodeFrameView } from "../views/node-frame-view";
import { State, toSelectionMode } from "./state";
import { DragNodesState } from "./drag-nodes-state";
import { IdleState } from "./idle-state";

export class StartDragFrameState extends State {
    constructor(private startPosition: Point, private frame: NodeFrameView) {
        super();
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        const MINIMAL_MOVE = 3;
        if (event.position.distance(this.startPosition) > MINIMAL_MOVE) {
            return new DragNodesState(editor.selection, this.startPosition).handleMouseMove(editor, event);
        }
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        const selectorResult = editor.openSelector(this.frame.labelBounds.middleBottom().offset(-100, 0), "select-value", {
            value: this.frame.frame.label,
            valueType: { type: CommonValueType.STRING }
        });
        selectorResult.result.then(newName => {
            editor.emit(new RenameFrameCommand(this.frame.frame, newName));
            editor.select([this.frame], toSelectionMode(event.specialKeys));
            editor.draw();
            return new IdleState();
        }, () => {});
        return selectorResult.state;
        
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }
}