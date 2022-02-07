import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { ISelectableView } from "../views/i-selectable-view";
import { State, toSelectionMode } from "./state";
import { DragNodesState } from "./drag-nodes-state";
import { IdleState } from "./idle-state";

export class StartDragNodesState extends State {
    constructor(private startPosition: Point, private node: ISelectableView) {
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
        editor.select([this.node], toSelectionMode(event.specialKeys));
        editor.draw();
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }
}