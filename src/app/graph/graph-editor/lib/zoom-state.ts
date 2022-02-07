import { Point } from "./geometry/point";

export class ZoomState {
    
    public origin: Point;
    public scale: number;

    constructor() {
        this.reset();
    }

    reset() {
        this.origin = new Point(0, 0);
        this.scale = 1.0;
    }
    
    move(offset: Point) {
        this.origin = this.origin.add(offset);
    }

    update(origin: Point, scale: number) {
        this.origin = origin;
        this.scale = scale;
    }
}