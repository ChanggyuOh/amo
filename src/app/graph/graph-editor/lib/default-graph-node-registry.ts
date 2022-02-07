import { INodeDefinition } from "./models/i-node-definition";
import { INodeRegistry } from "./models/i-node-registry";

export class DefaultGraphNodeRegistry implements INodeRegistry {
    private nodeDefinitionByType: { [key: string]: INodeDefinition } = {};

    constructor (private nodeDefinitions: INodeDefinition[]) {
        nodeDefinitions.forEach(nodeDefinition => {
            this.nodeDefinitionByType[nodeDefinition.id] = nodeDefinition;
        });
    }

    lookup(type: string): INodeDefinition {
        return this.nodeDefinitionByType[type];
    }

    all() {
        return this.nodeDefinitions;
    }
}
