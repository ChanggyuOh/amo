import { GraphNodeProperty } from "./graph-node-property";
import { isNewPort, isOutput, PropertyType } from "./enums/property-type.enum";

export class GraphNodeConnection {

    public from: GraphNodeProperty;
    public to: GraphNodeProperty;
    
    constructor(from: GraphNodeProperty, to: GraphNodeProperty) {
        if (isNewPort(from.definition.type)) {
            from = from.createSubProperty();
        }
        if (isNewPort(to.definition.type)) {
            to = to.createSubProperty();
        }
        function findPropertyByType(predicate: (t: PropertyType) => boolean) {
            if (predicate(from.definition.type)) {
                return from;
            }
            return to;
        }
        this.from = findPropertyByType(t => isOutput(t));
        this.to = findPropertyByType(t => !isOutput(t));
    }

    connect() {
        this.from.connectTo(this);
        this.to.connectTo(this);
    }

    disconnect() {
        this.from.disconnectFrom(this);
        this.to.disconnectFrom(this);
    }

    opposite(property: GraphNodeProperty): GraphNodeProperty {
        if (this.from == property) {
            return this.to;
        } else if (this.to == property) {
            return this.from;
        } else {
            return null;
        }
    }
}