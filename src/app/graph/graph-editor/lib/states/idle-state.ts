import { ControlKey } from "../enums/control-key.enum";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { NodeSelectionMode } from "../enums/node-selection-mode.enum";
import { State, toSelectionMode, translateKeymap } from "./state";
import { DragConnectionState } from "./drag-connection-state";
import { DragPanningState } from "./drag-panning-state";
import { DragResizeNodeState } from "./drag-resize-node-state";
import { DragSelectionBoxState } from "./drag-selection-box-state";
import { StartDragFrameState } from "./start-drag-frame-state";
import { StartDragNodesState } from "./start-drag-nodes-state";
import { ToggleCollapseState } from "./toggle-collapse-state";

export class IdleState extends State {
    handleMouseDown(editor: IEditor, event: IEvent): State {
        if (event.specialKeys & ControlKey.AltKey) {
            return new DragPanningState(event.position);
        }
        for (let node of editor.nodeViews.slice().reverse()) {
            // TODO compute a special node bounds containing connectors to speed up detection
            const connector = node.findConnector(event.position, editor.renderer.style);
            if (connector != null) {
                editor.select([node], NodeSelectionMode.REPLACE);
                return new DragConnectionState(editor, connector, event.position);
            } else if (node.bounds.contains(event.position)) {
                const collapseArrowSize = editor.renderer.style.collapseArrowSize;
                const arrowBounds = node.collapseArrowCenter.rectCentered(collapseArrowSize, collapseArrowSize);
                if (arrowBounds.contains(event.position)) {
                    return new ToggleCollapseState(node);
                } else if (node.labelBounds.contains(event.position)) {
                    if (!node.isSelected) {
                        editor.select([node], toSelectionMode(event.specialKeys));
                        editor.draw();
                    }
                    return new StartDragNodesState(event.position, node);
                } else {
                    const properties = node.propertyViews.filter(property => property.bounds.move(node.bounds.origin).contains(event.position));
                    if (properties.length > 0) {
                        const property = properties[0];
                        const handler = editor.renderer.graphicalHelper.getPropertyHandler(property.property);
                        if (handler) {
                            return handler.handlerMouseDown(editor, event, property);
                        }
                        return this;
                    }
                    const radius = editor.renderer.style.roundRadius;
                    if (node.bounds.corner().offset(-radius, -radius).distance(event.position) < radius) {
                        return new DragResizeNodeState(editor, node, event.position);
                    }
                    return this;
                }
            }
        }
        for (let frame of editor.frameViews.slice().reverse()) {
            if (frame.bounds.contains(event.position)) {
                if (!frame.isSelected) {
                    editor.select([frame], toSelectionMode(event.specialKeys));
                    editor.draw();
                }
                if (frame.labelBounds.contains(event.position)) {
                    return new StartDragFrameState(event.position, frame);
                } else {
                    return new StartDragNodesState(event.position, frame);
                }
            }
        }
        return new DragSelectionBoxState(editor, event.position);
    }

    handleMouseWheel(editor: IEditor, event: IEvent): State {
        // TODO adjust zoom panning
        // https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
        const zoomIntensity = 0.9;
        const zoomFactor = event.deltaY > 0 ? 1 / zoomIntensity : zoomIntensity;
        const offset = event.position.scale(zoomFactor - 1);
        editor.updateZoom(offset, zoomFactor);
        return this;
    }

    handleKeyUp(editor: IEditor, event: IEvent) {
        const action = translateKeymap(editor.keymap, event);
        if (action) {       
            return editor.doAction(action);
        }
        return this;
    }
}