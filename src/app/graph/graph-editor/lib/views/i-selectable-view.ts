import { Rectangle } from "../geometry/rectangle";
import { NodeFrameView } from "./node-frame-view";
import { NodeView } from "./node-view";

export interface ISelectableView {
    bounds: Rectangle;
    isSelected: boolean;
}

export function getAllNodesFromSelection(selection: ISelectableView[]): NodeView[] {
    const result: NodeView[] = [];
    selection.forEach(sv => {
        // TODO should have a better discriminator
        if ((<any>sv).node) {
            result.push(<NodeView>sv);
        } else {
            result.push(...(<NodeFrameView>sv).getAllNodes());
        }
    });
    return result;
}