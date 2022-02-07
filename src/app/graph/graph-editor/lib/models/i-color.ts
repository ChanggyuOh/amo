export interface IColor {
    r: number;
    g: number;
    b: number;
}

export function offsetColor(color: IColor, offset: number): IColor {
    function clamp(color: number) {
        return Math.max(Math.min(color, 255), 0);
    }
    return {
        r: clamp(color.r + offset),
        g: clamp(color.g + offset),
        b: clamp(color.b + offset)
    };
}