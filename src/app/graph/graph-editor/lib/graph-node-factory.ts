import { Point } from "./geometry/point";
import { GraphNode } from "./graph-node";
import { LoadContext } from "./load-context";
import { GraphNodeConnection } from "./graph-node-connection";
import { INodeGroup } from "./models/i-node-group";
import { INodeGroupIO } from "./models/i-node-group-io";
import { INodeRegistry } from "./models/i-node-registry";
import { SaveContext } from "./save-context";
import { ZoomState } from "./zoom-state";
export function newId() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for (let i = 0; i < 16; ++i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
export class GraphNodeFactory {
    constructor (private nodeRegistry: INodeRegistry) { }

    getNodeDefinitions() {
        return this.nodeRegistry.all();
    }

    createNode(type: string, location: Point): GraphNode {
        const nodeDefinition = this.nodeRegistry.lookup(type);
        if (! nodeDefinition) {
            throw new Error(`unknown node type ${type}`);
        }
        return new GraphNode(newId(), nodeDefinition, location);
    }

    load(nodeGroupIO: INodeGroupIO): INodeGroup {
        const context = new LoadContext(this.nodeRegistry);
        context.load(nodeGroupIO);
        nodeGroupIO.connections.forEach(connection => {
            const fromProp = context.nodeMap.get(connection.from.node).findPropertyFromPath(connection.from.property);
            const toProp   = context.nodeMap.get(connection.to.node).findPropertyFromPath(connection.to.property);
            new GraphNodeConnection(fromProp, toProp).connect();
        });
        const zoomState = new ZoomState();
        if (nodeGroupIO.canvas) {
            zoomState.update(new Point(nodeGroupIO.canvas.position.x || 0, nodeGroupIO.canvas.position.y || 0), nodeGroupIO.canvas.zoom || 1.0);
        }
        return {
            nodes: context.nodes,
            frames: context.frames,
            zoomState
        };
    }

    save(nodeGroup: INodeGroup): INodeGroupIO {
        const context = new SaveContext();
        context.save(nodeGroup);
        return {
            nodes: context.nodes,
            connections: context.connections,
            canvas: {
                position: { x: nodeGroup.zoomState.origin.x, y: nodeGroup.zoomState.origin.y },
                zoom: nodeGroup.zoomState.scale
            }
        };
    }

}