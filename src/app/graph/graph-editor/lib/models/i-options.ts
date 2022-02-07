import { ColorTheme } from "./i-color-theme";
import { IGraphicalHelper } from "./i-graphical-helper";
import { GraphNodeFactory } from "../graph-node-factory";

export interface IOptions {
    container: HTMLElement;
    nodeFactory: GraphNodeFactory;
    graphicalHelper: IGraphicalHelper;
    theme?: ColorTheme;
}