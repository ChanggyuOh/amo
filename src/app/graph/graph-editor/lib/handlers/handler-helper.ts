import { ChangePropertyValueCommand } from "../commands/change-property-value-command";
import { Point } from "../geometry/point";
import { Rectangle } from "../geometry/rectangle";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { GraphNodeProperty } from "../graph-node-property";
import { State } from "../states/state";
import { IValueDefinition } from "../value/i-value-definition";
import { IRange } from "../value/i-range";
import { IStyleDimension } from "../models/i-style-dimension";

export function isRangeFullyDefined(valueType: IValueDefinition) {
    return valueType.range && valueType.range.min != undefined && valueType.range.max != undefined;
}

export function clampRange(range: IRange, value: number) {
    if (range) {
        if (range.min != undefined) {
            value = Math.max(value, range.min);
        }
        if (range.max != undefined) {
            value = Math.min(value, range.max);
        }
    }
    return value;
}

export function roundInt(type: string, value: number) {
    if (type == "integer") {
        value = Math.round(value);
    }
    return value;
}

export function openValueEditor(editor: IEditor, location: Point, property: GraphNodeProperty,  event: IEvent): State {
    const selectorResult = editor.openSelector(location, 'select-value', {
        value: property.value,
        valueType : property.definition.valueType
    });
    selectorResult.result.then(value => {
        editor.emit(new ChangePropertyValueCommand(property, value));
    }, () => {});
    return selectorResult.state;
}

export function checkboxRect(position: Point, style: IStyleDimension) {
    return new Rectangle(position.x, position.y, style.unit * 3, style.unit * 3);
}