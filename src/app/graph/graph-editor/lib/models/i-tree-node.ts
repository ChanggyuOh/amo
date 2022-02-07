import { IEnumElement } from "../value/i-enum-element";
import { INodeDefinition } from "./i-node-definition";

export interface ITreeNode {
    name: string;
    title?: string;
    children?: ITreeNode[];
}

export function buildTreeFromEnums(values: IEnumElement[]) {
    return values.map(value =>({ name: value.name, title: value.label }));
}

export function buildTreeFromDefinitions(nodeDefinitions: INodeDefinition[]) {
    function processNode(node): ITreeNode[] {
        return Object.keys(node).map(name => {
            if (node[name].properties) {
                return { name: node[name].id, title: node[name].label };
            } else {
                return { name, children: processNode(node[name]) };
            }
        })
    }
    const root = {};
    nodeDefinitions.forEach(nodeDefinition => {
        let current = root;
        if (nodeDefinition.categories) {
            nodeDefinition.categories.split(":").forEach(category => {
                if (! current[category]) {
                    current[category] = {};
                }
                current = current[category];
            });
        }
        current[nodeDefinition.label] = nodeDefinition;
    });
    return processNode(root);
}

export function collectLeaves(roots: ITreeNode[]) {
    let result: ITreeNode[] = [];
    let work: ITreeNode[] = [].concat(roots);
    while (work.length > 0) {
        const element = work.shift();
        if (element.children) {
            element.children.forEach(e => work.push(e));
        } else {
            result.push(element);
        }
    }
    return result;
}