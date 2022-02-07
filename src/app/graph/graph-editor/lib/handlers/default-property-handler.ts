import { Align } from "../enums/align.enum";
import { Point } from "../geometry/point";
import { rgb } from "../models/i-color-theme";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { IPropertyHandler } from "../models/i-property-handler";
import { isOutput } from "../enums/property-type.enum";
import { Renderer } from "../renderer";
import { State } from "../states/state";
import { IdleState } from "../states/idle-state";
import { NodePropertyView } from "../views/node-property-view";

export const defaultPropertyHandler: IPropertyHandler = {
    
    handlerMouseDown(editor: IEditor,  event: IEvent, property: NodePropertyView): State {
        return new IdleState();
    },

    layout(renderer: Renderer, property: NodePropertyView) {
        const m = renderer.context.measureText(property.property.definition.label);
        property.bounds = new Point(0, 0).rect(m.width + renderer.style.unit * (3.5 + 2), renderer.style.unit * 4);
    },

    draw(renderer: Renderer, property: NodePropertyView) {
        const propBounds = property.globalBounds();
        const style = renderer.style;
        if (isOutput(property.property.definition.type)) {
            renderer.drawText(propBounds.topRight().offset(- style.unit * 4, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), property.property.definition.label, Align.RIGHT);
        } else {
            renderer.drawText(propBounds.origin.offset(style.unit * 3.5, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), property.property.definition.label);
        }
    }
}