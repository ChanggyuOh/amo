import { Align } from "../enums/align.enum";
import { Point } from "../geometry/point";
import { openValueEditor } from "./handler-helper";
import { rgb } from "../models/i-color-theme";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { IPropertyHandler } from "../models/i-property-handler";
import { Renderer } from "../renderer";
import { State } from "../states/state";
import { IdleState } from "../states/idle-state";
import { NodePropertyView } from "../views/node-property-view";

export const stringHandler: IPropertyHandler = {

    handlerMouseDown(editor: IEditor,  event: IEvent, property: NodePropertyView): State {
        const propBounds = property.globalBounds().shrink(editor.renderer.style.unit * 2, 0);
        if (propBounds.contains(event.position)) {
            return openValueEditor(editor, property.globalBounds().bottomLeft(), property.property, event);
        }
        return new IdleState();
    },

    layout(renderer: Renderer, property: NodePropertyView) {
        const m = renderer.context.measureText(property.property.definition.label);
        property.bounds = new Point(0, 0).rect(m.width + renderer.style.unit * 3, renderer.style.unit * 4);
    },

    draw(renderer: Renderer, property: NodePropertyView) {
        const propBounds = property.globalBounds();
        const style = renderer.style;
        const box = propBounds.shrink(style.unit * 2, 0).withHeight(style.unit * 4);
        renderer.roundBox()
            .filled(rgb(renderer.theme.PROPERTY_COLOR))
            .draw(box);

        renderer.drawText(propBounds.origin.offset(style.unit * 5, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), property.property.definition.label + ":");
        const value = property.getValue();
        const stringValue = value ? value.toString() : "";
        renderer.drawText(propBounds.topRight().offset(-style.unit * 5, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), stringValue, Align.RIGHT);
    }
};