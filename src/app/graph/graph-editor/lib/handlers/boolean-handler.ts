import { Point } from "../geometry/point";
import { rgb } from "../models/i-color-theme";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { IPropertyHandler } from "../models/i-property-handler";
import { Renderer } from "../renderer";
import { State } from "../states/state";
import { IdleState } from "../states/idle-state";
import { NodePropertyView } from "../views/node-property-view";
import { checkboxRect } from "./handler-helper";
import { ToggleBooleanPropertyState } from "./handler-states/toggle-boolean-property-state";

export const booleanHandler: IPropertyHandler = {

    handlerMouseDown(editor: IEditor,  event: IEvent, property: NodePropertyView): State {
        const style = editor.renderer.style;
        const rect = checkboxRect(property.globalBounds().origin.offset(style.unit * 2, 0), style);
        if (rect.contains(event.position)) {
            return new ToggleBooleanPropertyState(property);
        }
        return new IdleState();
    },

    layout(renderer: Renderer, property: NodePropertyView) {
        const m = renderer.context.measureText(property.property.definition.label);
        property.bounds = new Point(0, 0).rect(m.width + renderer.style.unit * (2 + 3 + 1 + 2), renderer.style.unit * 4);
    },

    draw(renderer: Renderer, property: NodePropertyView) {
        const propBounds = property.globalBounds();
        const style = renderer.style;
        const checked = <boolean>(property.getValue());
        renderer.drawCheckBox(checkboxRect(propBounds.origin.offset(style.unit * 2, 0), style), checked)
        renderer.drawText(propBounds.origin.offset(style.unit * 6, style.unit * 2.5), rgb(renderer.theme.TEXT_COLOR), property.property.definition.label);
    }
};