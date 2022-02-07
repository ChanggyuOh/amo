import { Renderer } from "../renderer";
import { State } from "../states/state";
import { NodePropertyView } from "../views/node-property-view";
import { IEditor } from "./i-editor";
import { IEvent } from "./i-event";

export interface IPropertyHandler {
    layout(renderer: Renderer, prop: NodePropertyView);
    draw(renderer: Renderer, prop: NodePropertyView);
    handlerMouseDown(editor: IEditor, event: IEvent, property: NodePropertyView): State;
}