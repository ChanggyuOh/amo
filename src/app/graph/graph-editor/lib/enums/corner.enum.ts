export enum Corner {
    TopLeft  = 1,
    TopRight = 2,
    BottomLeft = 4,
    BottomRight = 8
}

export const AllCorner = Corner.TopLeft | Corner.TopRight | Corner.BottomLeft | Corner.BottomRight;
