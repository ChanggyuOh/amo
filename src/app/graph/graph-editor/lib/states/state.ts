import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { IKeyMapping } from "../models/i-key-mapping";
import { NodePropertyView } from "../views/node-property-view";
import { NodeView } from "../views/node-view";
import { NodeSelectionMode } from "../enums/node-selection-mode.enum";
import { IStyleDimension } from "../models/i-style-dimension";
import { ControlKey } from "../enums/control-key.enum";

export function findConnector(nodes: NodeView[], position: Point, style: IStyleDimension): NodePropertyView {
    for (let node of nodes) {
        const connector = node.findConnector(position, style);
        if (connector != null) {
            return connector; 
        }
    }
    return null;
}

export function toSelectionMode(keys: number) {
    if ((keys & ControlKey.ShiftKey) != 0) {
        return NodeSelectionMode.ADD;
    } else if ((keys & ControlKey.CtrlKey) != 0) {
        return NodeSelectionMode.REMOVE;
    } else {
        return NodeSelectionMode.REPLACE;
    }
}

export function snap(point: Point, event: IEvent, snapSize: number) {
    if ((event.specialKeys & ControlKey.ShiftKey) != 0) {
        return new Point(Math.ceil(point.x / snapSize) * snapSize, Math.ceil(point.y / snapSize) * snapSize); 
    }
    return point;
}

export function translateKeymap(keymaps: IKeyMapping[], event: IEvent): string {
    for (let keymap of keymaps) {
        if (event.key === keymap.key && (event.specialKeys & keymap.meta) === keymap.meta) {
            return keymap.action;
        }
    }
    return null;
}

export class State {
    handleMouseMove(editor: IEditor, event: IEvent): State {
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        return this;
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        return this;
    }

    handleMouseWheel(editor: IEditor, event: IEvent): State {
        return this;
    }

    handleKeyUp(editor: IEditor, event: IEvent): State {
        return this;
    }
}

