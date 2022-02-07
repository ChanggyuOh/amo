export interface INodeIO {
    kind?: "node",
    id: string;
    type: string;
    location: { x: number, y: number };
    collapsed?: boolean;
    fullWidth?: number;
    properties?: { [name: string]: any };
}