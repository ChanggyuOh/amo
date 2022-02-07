import { Align } from "../enums/align.enum";
import { rgb } from "../models/i-color-theme";
import { Framable } from "../framable";
import { FramableView } from "./framable-view";
import { Rectangle } from "../geometry/rectangle";
import { IEditor } from "../models/i-editor";
import { ISelectableView } from "./i-selectable-view";
import { GraphNodeFrame } from "../graph-node-frame";
import { NodeView } from "./node-view";

export class NodeFrameView implements FramableView, ISelectableView {
    
    bounds: Rectangle;
    isSelected = false;
    parent: NodeFrameView = null;
    nodeViews: FramableView[];
    labelBounds: Rectangle;

    constructor(public frame: GraphNodeFrame) {}
    
    updateChildren(framables: Map<Framable, FramableView>): void {
        this.nodeViews = this.frame.nodes.map(node => {
            const framableView = framables.get(node);
            framableView.parent = this;
            return framableView;
        });
    }

    getAllNodes(): NodeView[] {
        const result: NodeView[] = [];
        this.nodeViews.forEach(fv => {
            if ((<any>fv).node) {
                result.push(<NodeView>fv);
            } else {
                result.push(...(<NodeFrameView>fv).getAllNodes());
            }
        })
        return result;
    }

    draw(editor: IEditor): void {
        const renderer = editor.renderer;
        const style = renderer.style;

        if (this.nodeViews.length > 0) {
            let bounds: Rectangle = undefined;
            this.nodeViews.forEach(nv => bounds = bounds ? bounds.union(nv.bounds) : nv.bounds);
            this.bounds = bounds.expand(20, 20).moveOrigin(0, 20-style.headerHeight);
            this.labelBounds = this.bounds.withHeight(style.unit*3);
        }

        renderer.roundBox()
            .filled(rgb(renderer.theme.FRAME_BACK_COLOR, renderer.theme.FRAME_COLOR_ALPHA))
            .shadow(this.parent == null)
            .draw(this.bounds);
        
        renderer.roundBox()
            .line(this.isSelected ? 3 : 1)
            .stroke(rgb(this.isSelected ? renderer.theme.SELECTION_COLOR : renderer.theme.BORDER_COLOR))
            .draw(this.bounds);

        renderer.drawText(this.bounds.middleTop().offset(0, style.unit*3), rgb(renderer.theme.TEXT_COLOR),
            this.frame.label, Align.CENTER);
    }

}
