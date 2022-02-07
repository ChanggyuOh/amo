import { ITreeNode } from "./i-tree-node";

export interface IUiNode extends ITreeNode {
    parentIndex?: number;
}
