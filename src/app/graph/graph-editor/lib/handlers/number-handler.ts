import { Align } from "../enums/align.enum";
import { Direction } from "../enums/direction.enum";
import { Point } from "../geometry/point";
import { rgb } from "../models/i-color-theme";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { IPropertyHandler } from "../models/i-property-handler";
import { Renderer } from "../renderer";
import { State } from "../states/state";
import { IdleState } from "../states/idle-state";
import { NodePropertyView } from "../views/node-property-view";
import { DetectPlusMinusChangeNumberState } from "./detect-plus-minus-change-number-state";
import { isRangeFullyDefined } from "./handler-helper";
import { WaitChangeNumberGestureState } from "./handler-states/wait-change-number-gesture-state";

export const numberHandler: IPropertyHandler = {

    handlerMouseDown(editor: IEditor,  event: IEvent, prop: NodePropertyView): State {
        const bounds = prop.globalBounds();
        const property = prop.property;
        const propBounds = bounds.shrink(editor.renderer.style.unit * 2, 0);
        if (propBounds.contains(event.position)) {
            if (isRangeFullyDefined(property.definition.valueType)) {
                return new WaitChangeNumberGestureState(event, prop);
            }
            return new DetectPlusMinusChangeNumberState(prop);
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

        if (isRangeFullyDefined(property.property.definition.valueType)) {
            const range = property.property.definition.valueType.range;
            const proportion = (<number>(property.property.value) - range.min) / (range.max - range.min);
            renderer.roundBox()
                .filled(rgb(renderer.theme.HIGHLIGHT_COLOR))
                .clipped(box.withWidth(box.dimension.width * proportion))
                .draw(box);
        } else {
            renderer.drawArrow(propBounds.middleLeft().offset(style.unit * 3.5, 0), style.unit, Direction.LEFT, rgb(renderer.theme.TEXT_COLOR, 0.7));
            renderer.drawArrow(propBounds.middleRight().offset(- style.unit * 3.5, 0), style.unit, Direction.RIGHT, rgb(renderer.theme.TEXT_COLOR, 0.7));
        }
        renderer.drawText(propBounds.origin.offset(style.unit * 5, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), property.property.definition.label + ":");
        const stringValue = (Math.round(property.getValue() * 100) / 100).toString();
        renderer.drawText(propBounds.topRight().offset(-style.unit * 5, style.unit * 3), rgb(renderer.theme.TEXT_COLOR), stringValue, Align.RIGHT);
    }
};