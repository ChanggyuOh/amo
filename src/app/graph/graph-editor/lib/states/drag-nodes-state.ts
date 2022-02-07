import { MoveNodeCommand } from "../commands/move-node-command";
import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { getAllNodesFromSelection, ISelectableView } from "../views/i-selectable-view";
import { NodeView } from "../views/node-view";
import { snap, State } from "./state";
import { IdleState } from "./idle-state";

export class DragNodesState extends State {

    private originalPositions = new Map<NodeView, Point>()

    constructor(selection: ISelectableView[], private startPosition: Point) {
        super();
        getAllNodesFromSelection(selection).forEach(node => {
            this.originalPositions.set(node, node.bounds.origin);
        });
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        for (let [node, startPosition] of this.originalPositions.entries()) {
            const point = startPosition.add(event.position.sub(this.startPosition));
            node.moveTo(snap(point, event, editor.renderer.style.snapSize));
        }
        editor.draw();
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        const moves = [];
        for (let [node, startPosition] of this.originalPositions.entries()) {
            const point = startPosition.add(event.position.sub(this.startPosition));
            const endPosition = snap(point, event, editor.renderer.style.snapSize);
            moves.push({ node: node.node, startPosition, endPosition });
        }
        if (moves.length > 0) {
            editor.emit(new MoveNodeCommand(moves));
        }
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }

}