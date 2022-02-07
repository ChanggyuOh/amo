import { IPropertyDefinition } from "./i-property-definition";

export interface INodeDefinition {
    id: string;
    label: string;
    categories?: string;
    properties: IPropertyDefinition[];
    preview?: boolean;
}