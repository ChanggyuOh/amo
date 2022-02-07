import { Framable } from "./framable";
import { Point } from "./geometry/point";
import { INodeDefinition } from "./models/i-node-definition";
import { GraphNodeProperty } from "./graph-node-property";

export class GraphNode extends Framable {
    
    collapsed: boolean = false;
    fullWidth: number = 0;
    properties: GraphNodeProperty[];

    constructor(public id: string, public definition: INodeDefinition, public location: Point) {
        super();
        this.properties = definition.properties.map(def => new GraphNodeProperty(def, this));
    }

    findProperty(propName: string): GraphNodeProperty {
        return this.properties.find(property => property.definition.id === propName);
    }

    findPropertyFromPath(propName: string): GraphNodeProperty {
        const separatorPos = propName.indexOf(".");
        if (separatorPos > 0) {
            const mainName = propName.substring(0, separatorPos);
            const mainProperty = this.findProperty(mainName);
            if (!mainProperty) {
                return null;
            }
            const subPropertyName = propName.substring(separatorPos + 1);
            return mainProperty.findSubProperty(subPropertyName);
        }
        return this.findProperty(propName);
    }
}