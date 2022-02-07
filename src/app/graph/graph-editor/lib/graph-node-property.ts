import { GraphNode } from "./graph-node";
import { GraphNodeConnection } from "./graph-node-connection";
import { newId } from "./graph-node-factory";
import { IPropertyDefinition } from "./models/i-property-definition";
import { isNewPort, PropertyType } from "./enums/property-type.enum";

export class GraphNodeProperty {
    value: any;
    connections: GraphNodeConnection[] = [];
    subProperties: GraphNodeProperty[] = [];
    private knownSubProperties: GraphNodeProperty[] = [];

    constructor(public definition: IPropertyDefinition, public node: GraphNode, public parent: GraphNodeProperty = null) {
        this.value = definition.defaultValue; // TODO make a copy
    }

    isConnected() {
        return this.connections.length > 0;
    }
    
    isEditable() {
        if (! this.definition.editable) return false;
        // if (this.definition.valueType.type == CommonValueType.LABEL) return true;
        return !(this.definition.type == PropertyType.INPUT && this.isConnected()); 
    }

    refreshValue(value: any) {
        if (isNewPort(this.definition.type)) {
            this.knownSubProperties = Object.keys(value).map(key => this.makeSubProperty(key, value[key]));
        } else {
            this.value = value;
        }
    }

    setValue(value: any) {
        this.value = value;
        if (this.parent) {
            this.parent.setSubValue(this);
        }
    }

    getId() {
        let id = this.definition.id;
        if (this.parent) {
            id = this.parent.getId() + "." + id;
        }
        return id;
    }
    
    isRelatedTo(other: GraphNodeProperty): boolean {
        if (other.parent) {
            other = other.parent;
        }
        if (this.parent) {
            return other.isRelatedTo(this);
        }
        return this == other;
    }

    findSubProperty(subPropertyName: string): GraphNodeProperty {
        return this.knownSubProperties.find(property => property.definition.id === subPropertyName);
    }

    createSubProperty() {
        return this.makeSubProperty(newId());
    }

    private addSubProperty(subProperty: GraphNodeProperty) {
        this.subProperties.push(subProperty);
        this.setSubValue(subProperty);
    }

    private setSubValue(subProperty: GraphNodeProperty) {
        this.value = {...this.value, [subProperty.definition.id]: subProperty.value };
    }

    private removeSubProperty(subProperty: GraphNodeProperty) {
        this.subProperties.splice(this.subProperties.indexOf(subProperty), 1);
        delete this.value[subProperty.definition.id];
    }

    private makeSubProperty(key: string, label: string = undefined) {
        if (! label) {
            label = `${this.definition.label}-${this.subProperties.length}`;
        }
        const definition: IPropertyDefinition = {
            id: key,
            label: label,
            type: this.definition.type == PropertyType.NEW_INPUT ? PropertyType.INPUT : PropertyType.OUTPUT,
            valueType: this.definition.valueType,
            linkable: true,
            editable: this.definition.editable
        };
        const subProp = new GraphNodeProperty(definition, this.node, this);
        subProp.value = label;
        return subProp;
    }

    getValue() {
        // TODO if input and connected get other side value
        return this.value;
    }

    connectTo(connection: GraphNodeConnection) {
        if (this.connections.indexOf(connection) < 0) {
            this.connections.push(connection);
            if (this.parent && this.connections.length == 1) {
                this.parent.addSubProperty(this);
            }
        }
    }

    disconnectFrom(connection: GraphNodeConnection) {
        const pos = this.connections.indexOf(connection);
        if (pos >= 0) {
            this.connections.splice(pos, 1);
            if (this.parent && this.connections.length == 0) {
                this.parent.removeSubProperty(this);
            }
        }
    }
    
}