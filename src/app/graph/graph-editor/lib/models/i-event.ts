import { Point } from "../geometry/point";

export interface IEvent {
    position: Point;
    screenPosition: Point;
    specialKeys: number;
    deltaY?: number;
    key?: string;
}
