import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IVisualFeedback } from "../models/i-visual-feedback";
import { NodePropertyView } from "../views/node-property-view";

export class PendingConnectionFeedback implements IVisualFeedback {

    toProperty: NodePropertyView = null;
    
    constructor(private fromProperty: NodePropertyView, private toPoint: Point) {}

    update(toProperty: NodePropertyView, position: Point) {
        this.toProperty = toProperty;
        this.toPoint = position;
    }

    draw(editor: IEditor) {
        let toPos = this.toPoint;
        let color = editor.renderer.theme.NODE_BACK_COLOR;
        if (this.toProperty != null && editor.canConnect(this.fromProperty.property, this.toProperty.property)) {
            toPos = this.toProperty.globalPosition();
            color = editor.renderer.theme.SELECTION_COLOR;
        }
        const fromPos = this.fromProperty.globalPosition();
        editor.renderer.drawConnection(fromPos, toPos, color);
    }
}