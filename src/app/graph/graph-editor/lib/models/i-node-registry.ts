import { INodeDefinition } from "./i-node-definition";

export interface INodeRegistry {
    all(): INodeDefinition[];
    lookup(type: string): INodeDefinition;
}
