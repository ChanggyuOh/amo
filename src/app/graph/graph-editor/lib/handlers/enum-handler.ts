import { ChangePropertyValueCommand } from "../commands/change-property-value-command";
import { Direction } from "../enums/direction.enum";
import { Point } from "../geometry/point";
import { rgb } from "../models/i-color-theme";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { IPropertyHandler } from "../models/i-property-handler";
import { Renderer } from "../renderer";
import { State } from "../states/state";
import { buildTreeFromEnums } from "../models/i-tree-node";
import { NodePropertyView } from "../views/node-property-view";

export const enumHandler: IPropertyHandler = {
    
    handlerMouseDown(editor: IEditor,  event: IEvent, property: NodePropertyView): State {
        const selectorResult = editor.openSelector(property.globalBounds().bottomLeft(), 'select-tree', {
            nodes: buildTreeFromEnums(property.property.definition.valueType.enumValues)
        });
        selectorResult.result.then(value => {
            editor.emit(new ChangePropertyValueCommand(property.property, value.name));
        }, () => {});
        return selectorResult.state;
    },

    layout(renderer: Renderer, property: NodePropertyView) {
        const m = renderer.context.measureText(property.property.definition.label);
        property.bounds = new Point(0, 0).rect(m.width + renderer.style.unit * 3, renderer.style.unit * 4);
    },

    draw(renderer: Renderer, property: NodePropertyView) {
        const propBounds = property.globalBounds();
        const style = renderer.style;
        const value = property.getValue();
        const box = propBounds.shrink(style.unit * 2, 0).withHeight(style.unit * 4);
        renderer.roundBox()
            .filled(rgb(renderer.theme.SELECT_BACK_COLOR))
            .draw(box);

        const values = property.property.definition.valueType.enumValues.filter(enumValue => enumValue.name == <string>value);
        const valueLabel = values.length > 0 ? values[0].label : "";

        renderer.drawText(propBounds.origin.offset(style.unit * 3.5, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), valueLabel);

        renderer.drawArrow(propBounds.middleRight().offset(-style.unit * 3.5, 0), style.unit, Direction.DOWN, rgb(renderer.theme.TEXT_COLOR, 0.7));
    }
};