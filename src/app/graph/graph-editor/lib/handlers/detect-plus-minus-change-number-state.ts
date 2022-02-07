import { ChangePropertyValueCommand } from "../commands/change-property-value-command";
import { Rectangle } from "../geometry/rectangle";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { GraphNodeProperty } from "../graph-node-property";
import { State } from "../states/state";
import { IdleState } from "../states/idle-state";
import { NodePropertyView } from "../views/node-property-view";
import { clampRange, openValueEditor } from "./handler-helper";

export class DetectPlusMinusChangeNumberState extends State {
    private property: GraphNodeProperty;
    private globalBounds: Rectangle;
    
    constructor(private prop: NodePropertyView) {
        super();
        this.property = prop.property;
        this.globalBounds = this.prop.globalBounds();
    }

    handleMouseUp(editor: IEditor,  event: IEvent) {
        const style = editor.renderer.style;
        const propBounds = this.globalBounds.shrink(style.unit * 2, 0);
        const minusRect = propBounds.origin.rect(style.unit * 3.5, propBounds.dimension.height);
        const plusRect = propBounds.topRight().offset(- style.unit * 3.5, 0).rect(style.unit * 3.5, propBounds.dimension.height);
        if (minusRect.contains(event.position)) {
            const newValue = clampRange(this.property.definition.valueType.range, this.property.value - 1);
            if (this.property.value != newValue) {
                editor.emit(new ChangePropertyValueCommand(this.property, newValue));
            }
        } else if (plusRect.contains(event.position)) {
            const newValue = clampRange(this.property.definition.valueType.range, this.property.value + 1);
            if (this.property.value != newValue) {
                editor.emit(new ChangePropertyValueCommand(this.property, newValue));
            }
        } else {
            return openValueEditor(editor, this.globalBounds.bottomLeft(), this.property, event);
        }
        return new IdleState();
    }
}