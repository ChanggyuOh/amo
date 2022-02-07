import { GraphNodeConnection } from "../graph-node-connection";
import { NodePropertyView } from "./node-property-view";

export class ConnectionView {
    
    constructor(public connection: GraphNodeConnection, public from: NodePropertyView, public to: NodePropertyView) {}

    opposite(property: NodePropertyView): NodePropertyView {
        if (property === this.from) {
            return this.to;
        }
        return this.from;
    }
}