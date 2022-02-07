import { rgb } from "../models/i-color-theme";
import { ConnectionView } from "./connection-view";
import { Point } from "../geometry/point";
import { Rectangle } from "../geometry/rectangle";
import { GraphNodeConnection } from "../graph-node-connection";
import { GraphNodeProperty } from "../graph-node-property";
import { NodeView } from "./node-view";
import { isNewPort, PropertyType } from "../enums/property-type.enum";
import { Renderer } from "../renderer";
import { defaultPropertyHandler } from "../handlers/default-property-handler";

export class NodePropertyView {
    bounds: Rectangle; // relative to parent node position
    connector: Point;  // relative to parent node position
    connections: ConnectionView[] = [];

    constructor(public property: GraphNodeProperty, public node: NodeView) {}

    isConnected() {
        return this.property.isConnected();
    }
    
    isEditable() {
        return this.property.isEditable();
    }

    globalBounds() {
        return this.bounds.move(this.node.bounds.origin);
    }

    globalPosition(): Point {
        return this.connector.add(this.node.bounds.origin);
    }

    getValue() {
        return this.property.getValue();
    }

    connectTo(connection: GraphNodeConnection) {
        this.property.connectTo(connection);
    }

    disconnectFrom(connection: GraphNodeConnection) {
        this.property.disconnectFrom(connection);
    }

    updateConnections(propertyMap: Map<GraphNodeProperty, NodePropertyView>): void {
        this.connections = this.property.connections.map(connection => {
            const from = propertyMap.get(connection.from);
            const to = propertyMap.get(connection.to);
            return new ConnectionView(connection, from, to)
        });
    }

    setBounds(bounds: Rectangle) {
        this.bounds = bounds;
        this.connector = this.property.definition.type == PropertyType.INPUT
            || this.property.definition.type == PropertyType.NEW_INPUT ? bounds.middleLeft() : bounds.middleRight();
    }

    drawProperty(renderer: Renderer, origin: Point) {
        if (this.property.isEditable()) {
            const handler = renderer.graphicalHelper.getPropertyHandler(this.property);
            if (handler) {
                handler.draw(renderer, this);
            } else {
                // default just in case but should not be used as property is editable
                console.log("no handler for drawing", this);
                defaultPropertyHandler.draw(renderer, this);
            }
        } else {
            // not editable: just the label
            defaultPropertyHandler.draw(renderer, this);
        }
        this.drawConnector(renderer, origin);
    }

    drawConnector(renderer: Renderer, origin: Point) {
        if (this.property.definition.linkable) {
            renderer.drawConnector(this.connector.add(origin),
                rgb(renderer.graphicalHelper.getConnectorColor(this.property)),
                isNewPort(this.property.definition.type));
        }
    }
    
}
