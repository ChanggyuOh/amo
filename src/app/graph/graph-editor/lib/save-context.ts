import { Framable } from "./framable";
import { IFrameIO } from "./models/i-frame-io";
import { GraphNode } from "./graph-node";
import { GraphNodeConnection } from "./graph-node-connection";
import { GraphNodeFrame } from "./graph-node-frame";
import { INodeGroup } from "./models/i-node-group";
import { INodeIO } from "./models/i-node-io";
import { isOutput } from "./enums/property-type.enum";

export class SaveContext {
    connections = [];
    nodes: (INodeIO | IFrameIO)[] = [];
    seenNodes = [];

    save(nodeGroup: INodeGroup) {
        nodeGroup.frames.forEach(f => {
            this.nodes.push(this.saveFrame(f));
        });
        nodeGroup.nodes
            .filter(n => this.seenNodes.indexOf(n) < 0)
            .forEach(n => {
                this.nodes.push(this.saveNode(n));
            });
    }

    private saveFramable(f: Framable): IFrameIO | INodeIO {
        if ((f as any).definition) {
            return this.saveNode(<GraphNode>f);
        }
        return this.saveFrame(<GraphNodeFrame>f);
    }

    private saveFrame(f: GraphNodeFrame): IFrameIO {
        return { kind: "frame", label: f.label, nodes: f.nodes.map(n => this.saveFramable(n))}
    }

    private saveConnection(c: GraphNodeConnection) {
        this.connections.push({
            from: { node: c.from.node.id, property: c.from.getId() },
            to: { node: c.to.node.id, property: c.to.getId() },
        });
    }

    private saveNode(n: GraphNode) {
        this.seenNodes.push(n);
        const properties = {};
        let hasProperties = false;
        n.properties.forEach(prop => {
            if (prop.value !== undefined) {
                properties[prop.definition.id] = prop.value;
                hasProperties = true;
            }
            if (isOutput(prop.definition.type) && prop.connections) {
                prop.connections.forEach(c => this.saveConnection(c));
                prop.subProperties.forEach(subProp => {
                    subProp.connections.forEach(c => this.saveConnection(c))
                });
            }
        });
        const node: INodeIO = {
            id: n.id,
            type: n.definition.id,
            location: { x: n.location.x, y: n.location.y }
        };
        if (n.collapsed) {
            node.collapsed = true;
        }
        if (n.fullWidth > 0) {
            node.fullWidth = n.fullWidth;
        }
        if (hasProperties) {
            node.properties = properties;
        }
        return node;
    }
}