import { ICommand } from "../commands/i-command";
import { Point } from "../geometry/point";
import { IKeyMapping } from "./i-key-mapping";
import { ISelectableView } from "../views/i-selectable-view";
import { ISelectorResult } from "./i-selector-result";
import { NodeFrameView } from "../views/node-frame-view";
import { INodeGroup } from "./i-node-group";
import { GraphNodeProperty } from "../graph-node-property";
import { NodeView } from "../views/node-view";
import { Renderer } from "../renderer";
import { State } from "../states/state";
import { IVisualFeedback } from "./i-visual-feedback";
import { NodeSelectionMode } from "../enums/node-selection-mode.enum";

export interface IEditor {
    
    nodeGroup: INodeGroup;
    renderer: Renderer;
    nodeViews: NodeView[];
    frameViews: NodeFrameView[];
    selection: ISelectableView[];
    keymap: IKeyMapping[];
    
    select(nodes: ISelectableView[], mode: NodeSelectionMode);
    
    updatePosition(offset: Point);
    updateZoom(offset: Point, zoomFactor: number);

    canConnect(from: GraphNodeProperty, to: GraphNodeProperty);

    emit(command: ICommand);

    addFeedback(feedback: IVisualFeedback);
    removeFeedback(feedback: IVisualFeedback);
    draw();

    openSelector(position: Point, name: string, context: any): ISelectorResult;
    doAction(name: string): State;

    onGraphChange(callback: (nodeGroup: INodeGroup) => void);

}