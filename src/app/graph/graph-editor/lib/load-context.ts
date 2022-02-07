import { Framable } from "./framable";
import { IFrameIO } from "./models/i-frame-io";
import { Point } from "./geometry/point";
import { GraphNode } from "./graph-node";
import { GraphNodeFrame } from "./graph-node-frame";
import { INodeGroupIO } from "./models/i-node-group-io";
import { INodeIO } from "./models/i-node-io";
import { INodeRegistry } from "./models/i-node-registry";

export class LoadContext {
    nodeMap = new Map<string, GraphNode>();
    nodes: GraphNode[] = [];
    frames: GraphNodeFrame[] = [];

    constructor(private nodeRegistry: INodeRegistry) {}
    
    load(nodeGroupIO: INodeGroupIO) {
        nodeGroupIO.nodes.forEach(n => this.loadFramable(n, null));
    }

    private loadFramable(n: INodeIO | IFrameIO, parent: GraphNodeFrame): Framable {
        if (n.kind == "frame") {
            const frame = new GraphNodeFrame(n.label);
            n.nodes.forEach(n => frame.addChild(this.loadFramable(n, frame)));
            if (! parent) {
                this.frames.push(frame);
            }
            return frame;
        } else {
            const node = new GraphNode(n.id, this.nodeRegistry.lookup(n.type), new Point(n.location.x, n.location.y));
            node.collapsed = n.collapsed || false;
            node.fullWidth = n.fullWidth || 0;
            if (n.properties) {
                for (let name in n.properties) {
                    const value = n.properties[name];
                    node.findProperty(name).refreshValue(value);
                }
            }
            this.nodeMap.set(node.id, node);
            this.nodes.push(node);
            return node;
        }
    }
}
