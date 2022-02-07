import { IEditor } from "../../models/i-editor";
import { IEvent } from "../../models/i-event";
import { State } from "../../states/state";
import { NodePropertyView } from "../../views/node-property-view";
import { openValueEditor } from "../handler-helper";
import { ChangeValueGesture } from "./change-value-gesture-state";

export class WaitChangeNumberGestureState extends State {

    constructor(private startEvent: IEvent, private property: NodePropertyView) {
        super();
    }

    handleMouseUp(editor: IEditor,  event: IEvent) {
        return openValueEditor(editor, this.property.globalBounds().bottomLeft(), this.property.property, event);
    }

    handleMouseMove(editor: IEditor,  event: IEvent): State {
        if (event.screenPosition.distance(this.startEvent.screenPosition) > 5) {
            return new ChangeValueGesture(this.startEvent, this.property.bounds, this.property.property);
        }
        return this;
    }
}