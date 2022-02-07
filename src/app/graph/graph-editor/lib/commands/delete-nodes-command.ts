import { GraphNode } from "../graph-node";
import { GraphNodeConnection } from "../graph-node-connection";
import { GraphNodeFrame } from "../graph-node-frame";
import { INodeGroup } from "../models/i-node-group";
import { ICommand } from "./i-command";

export class DeleteNodesCommand implements ICommand {
    isVisual = false;

    private connections: GraphNodeConnection[] = [];
    private frameParents = new Map<GraphNodeFrame, GraphNodeFrame>();

    constructor(private nodeGroup: INodeGroup, private nodes: GraphNode[], private frames: GraphNodeFrame[]) {
        this.connections = [];
        nodes.forEach(node => {
            node.properties.forEach(property => {
                property.connections.forEach(connection => {
                    if (this.connections.indexOf(connection) < 0) {
                        this.connections.push(connection);
                    }
                });
            });
        });
        frames.forEach(frame => {
            this.frameParents.set(frame, frame.parent);
        })
    }

    execute() {
        for (let [frame, parent] of this.frameParents.entries()) {
            if (parent) {
                console.log("TODO remove a frame from another frame")
            } else {
                this.nodeGroup.frames.splice(this.nodeGroup.frames.indexOf(frame), 1);
            }
        }
        this.nodeGroup.nodes = this.nodeGroup.nodes.filter(n => this.nodes.indexOf(n) < 0);
        this.connections.forEach(connection => connection.disconnect());
    }

    undo() {
        for (let [frame, parent] of this.frameParents.entries()) {
            if (parent) {
                console.log("TODO UNDO remove a frame from another frame")
            } else {
                this.nodeGroup.frames.push(frame);
            }
        }
        this.nodeGroup.nodes = this.nodeGroup.nodes.concat(this.nodes);
        this.connections.forEach(connection => connection.connect());
    }

    redo() {
        this.execute();
    }

}