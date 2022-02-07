import { Dimension } from "./dimension";
import { Point } from "./point";

export class Rectangle {
    
    origin: Point;
    dimension: Dimension;

    constructor(x: number, y: number, width: number, height: number) {
        this.origin = new Point(x, y);
        this.dimension = new Dimension(width, height);
    }

    corner() {
        return this.origin.offset(this.dimension.width, this.dimension.height);
    }

    topRight(): Point {
        return this.origin.offset(this.dimension.width, 0);
    }

    bottomLeft(): Point {
        return this.origin.offset(0, this.dimension.height);
    }

    middleRight() {
        return this.origin.offset(this.dimension.width, this.dimension.height / 2);
    }

    middleLeft() {
        return this.origin.offset(0, this.dimension.height / 2);
    }

    middleTop() {
        return this.origin.offset(this.dimension.width / 2, 0);
    }

    middleBottom(): Point {
        return this.origin.offset(this.dimension.width / 2, this.dimension.height);
    }

    expand(dx: number, dy: number): Rectangle {
        return new Rectangle(this.origin.x - dx, this.origin.y - dy,
            this.dimension.width + dx * 2, this.dimension.height + dy * 2);
    }

    shrink(dx: number, dy: number): Rectangle {
        return new Rectangle(this.origin.x + dx, this.origin.y + dy,
            this.dimension.width - dx * 2, this.dimension.height - dy * 2);
    }

    withSize(newDimension: Dimension): Rectangle {
        return new Rectangle(this.origin.x, this.origin.y,
            newDimension.width, newDimension.height);
    }

    withWidth(newWidth: number): Rectangle {
        return new Rectangle(this.origin.x, this.origin.y,
            newWidth, this.dimension.height);
    }

    withHeight(newHeight: number): Rectangle {
        return new Rectangle(this.origin.x, this.origin.y,
            this.dimension.width, newHeight);
    }

    moveOrigin(dx: number, dy: number): Rectangle {
        return new Rectangle(this.origin.x + dx, this.origin.y + dy,
            this.dimension.width - dx, this.dimension.height - dy);
    }

    move(amount: Point): Rectangle {
        return new Rectangle(this.origin.x + amount.x, this.origin.y + amount.y,
            this.dimension.width, this.dimension.height);
    }

    moveTo(location: Point): Rectangle {
        return new Rectangle(location.x, location.y,
            this.dimension.width, this.dimension.height);
    }

    contains(position: Point): boolean {
        return position.x >= this.origin.x && position.y >= this.origin.y
            && position.x <= this.corner().x && position.y <= this.corner().y;
    }

    containsRect(other: Rectangle): boolean {
        return this.contains(other.origin) && this.contains(other.corner());
    }

    union(other: Rectangle): Rectangle {
        const origin = this.origin.min(other.origin);
        const corner = this.corner().max(other.corner());
        return new Rectangle(origin.x, origin.y, corner.x - origin.x, corner.y - origin.y);
    }
} 