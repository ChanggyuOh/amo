import { Point } from "../geometry/point";
import { Rectangle } from "../geometry/rectangle";
import { IEditor } from "../models/i-editor";
import { IVisualFeedback } from "../models/i-visual-feedback";

export class ResizeNodeFeedback implements IVisualFeedback {
    foreground = true;
    bounds: Rectangle;
    
    constructor(private fromPosition: Point, private toPosition: Point) {
        this.update(fromPosition);
    }

    draw(editor: IEditor) {
        editor.renderer.drawSelection(this.bounds);
    }

    update(position: Point) {
        this.toPosition = position;
        this.bounds = this.fromPosition.rectTo(this.toPosition);
    }
}