import { IColor } from "./i-color";
import { GraphNode } from "../graph-node";
import { IPropertyHandler } from "./i-property-handler";
import { GraphNodeProperty } from "../graph-node-property";

export interface IGraphicalHelper {
    getHeaderColor(node: GraphNode): IColor;
    getConnectorColor(valueDef: GraphNodeProperty): IColor;
    getPropertyHandler(property: GraphNodeProperty): IPropertyHandler;
}