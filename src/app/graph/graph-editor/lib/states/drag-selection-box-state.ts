import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { ISelectableView } from "../views/i-selectable-view";
import { NodeSelectionMode } from "../enums/node-selection-mode.enum";
import { State, toSelectionMode } from "./state";
import { IdleState } from "./idle-state";
import { SelectionBoxFeedback } from "./selection-box-feedback";

export class DragSelectionBoxState extends State {

    feedback: SelectionBoxFeedback;
    originalSelection: ISelectableView[];

    constructor (editor: IEditor, startPoint: Point) {
        super();
        this.originalSelection = editor.selection.slice();
        this.feedback = new SelectionBoxFeedback(startPoint)
        editor.addFeedback(this.feedback);
        editor.draw();
    }

    private updateSelection(editor: IEditor, event: IEvent) {
        let selectedNodes: ISelectableView[] = editor.nodeViews.filter(node => {
            return this.feedback.bounds.containsRect(node.bounds);
        });
        const mode = toSelectionMode(event.specialKeys);
        if (mode == NodeSelectionMode.ADD) {
            this.originalSelection.forEach(node => {
                if (selectedNodes.indexOf(node) < 0) {
                    selectedNodes.push(node);
                }
            });
        } else if (mode == NodeSelectionMode.REMOVE) {
            selectedNodes = this.originalSelection.filter(node => selectedNodes.indexOf(node) < 0);         
        }
        editor.select(selectedNodes, NodeSelectionMode.REPLACE);
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        this.feedback.update(event.position);
        this.updateSelection(editor, event);
        editor.draw();
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        this.updateSelection(editor, event);
        editor.removeFeedback(this.feedback);
        editor.draw();
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }
}