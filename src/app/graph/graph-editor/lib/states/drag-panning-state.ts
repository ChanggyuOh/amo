import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { State } from "./state";
import { IdleState } from "./idle-state";

export class DragPanningState extends State {

    constructor(private startPoint: Point) {
        super();
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        editor.updatePosition(this.startPoint.sub(event.position));
        editor.draw();
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }

}