import { ChangePropertyValueCommand } from "../../commands/change-property-value-command";
import { Rectangle } from "../../geometry/rectangle";
import { IEditor } from "../../models/i-editor";
import { IEvent } from "../../models/i-event";
import { GraphNodeProperty } from "../../graph-node-property";
import { State } from "../../states/state";
import { IdleState } from "../../states/idle-state";
import { clampRange, roundInt } from "../handler-helper";

export class ChangeValueGesture extends State {
    private oldValue: number;

    constructor(private startEvent: IEvent, private bounds: Rectangle, private property: GraphNodeProperty) {
        super();
        this.oldValue = property.value;
    }

    handleMouseUp(editor: IEditor,  event: IEvent) {
        const newValue = this.property.value;
        this.property.value = this.oldValue;
        if (this.oldValue != newValue) {
            editor.emit(new ChangePropertyValueCommand(this.property, newValue));
        }
        return new IdleState();
    }

    handleMouseMove(editor: IEditor,  event: IEvent): State {
        const valueType = this.property.definition.valueType;
        const range = valueType.range;
        const offset = (range.max - range.min) * (event.position.x - this.startEvent.position.x) / this.bounds.dimension.width;
        this.property.value = roundInt(valueType.type, clampRange(range, this.oldValue + offset));
        editor.draw();
        return this;
    }
}