import { Framable } from "./framable";

export class GraphNodeFrame extends Framable {
    
    nodes: Framable[] = [];

    constructor(public label: string) {
        super()
    }

    addChild(node: Framable) {
        this.nodes.push(node);
    }

    removeChild(node: Framable) {
        this.nodes.splice(this.nodes.indexOf(node), 1);
    }
}
