import { Point } from "../geometry/point";
import { Rectangle } from "../geometry/rectangle";
import { IEditor } from "../models/i-editor";
import { IVisualFeedback } from "../models/i-visual-feedback";

export class SelectionBoxFeedback implements IVisualFeedback {
    foreground = true;
    toPosition: Point;
    bounds: Rectangle;
    
    constructor(private fromPosition: Point) {
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
