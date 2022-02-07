import { Dimension } from "./dimension";
import { Rectangle } from "./rectangle";

export class Point {
    
    constructor(public x: number, public y: number) { }

    offset(dx: number, dy: number) {
        return new Point(this.x + dx, this.y + dy);
    }

    rect(width: number, height: number): Rectangle {
        return new Rectangle(this.x, this.y, width, height);
    }

    rectOf(dimension: Dimension): Rectangle {
        return new Rectangle(this.x, this.y, dimension.width, dimension.height);
    }

    rectCentered(width: number, height: number) {
        return new Rectangle(this.x - width/2, this.y - height / 2, width, height);
    }

    rectTo(other: Point) {
        const mx = Math.min(this.x, other.x);
        const my = Math.min(this.y, other.y);
        const width = Math.abs(this.x - other.x);
        const height = Math.abs(this.y - other.y);
        return new Rectangle(mx, my, width, height);
    }

    add(other: Point) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    sub(other: Point): any {
        return new Point(this.x - other.x, this.y - other.y);
    }

    distance(position: Point) {
        return Math.sqrt((this.x - position.x) * (this.x - position.x) + (this.y - position.y) * (this.y - position.y));
    }

    scale(amount: number): Point {
        return new Point(this.x * amount, this.y * amount);
    }

    min(other: Point) {
        return new Point(Math.min(this.x, other.x), Math.min(this.y, other.y));
    }

    max(other: Point) {
        return new Point(Math.max(this.x, other.x), Math.max(this.y, other.y));
    }
}