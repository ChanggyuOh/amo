import { GraphNodeFrame } from "./graph-node-frame";

export abstract class Framable {
    parent?: GraphNodeFrame;

    addToFrame(frame: GraphNodeFrame) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = frame;
        if (this.parent) {
            this.parent.addChild(this);
        }
    }
}