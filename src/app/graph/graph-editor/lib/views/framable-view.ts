import { ISelectableView } from "./i-selectable-view";
import { NodeFrameView } from "./node-frame-view";

export interface FramableView extends ISelectableView {
    parent?: NodeFrameView;
}