import { ISelectableView } from "../views/i-selectable-view";
import { NodeFrameView } from "../views/node-frame-view";

export interface IFramableView extends ISelectableView {
    parent?: NodeFrameView;
}