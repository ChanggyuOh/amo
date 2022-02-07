import { IColor } from "./i-color";

export interface ColorTheme {
    BACKGROUND_COLOR  : IColor;
    NODE_BACK_COLOR   : IColor;
    FRAME_BACK_COLOR  : IColor;
    FRAME_COLOR_ALPHA  : number;
    TEXT_COLOR        : IColor;
    BORDER_COLOR      : IColor;
    PROPERTY_COLOR    : IColor;
    HIGHLIGHT_COLOR   : IColor;
    SELECT_BACK_COLOR : IColor;
    CHECK_BACK_COLOR  : IColor;
    SELECTION_COLOR   : IColor;
}

export const darkTheme: ColorTheme = {
    BACKGROUND_COLOR  : { r: 0x1d, g: 0x1d, b: 0x1d },
    NODE_BACK_COLOR   : { r: 0x45, g: 0x45, b: 0x45 },
    FRAME_BACK_COLOR  : { r: 0x55, g: 0x70, b: 0x55 },
    FRAME_COLOR_ALPHA  : 0.7,
    TEXT_COLOR        : { r: 0xFF, g: 0xFF, b: 0xFF },
    BORDER_COLOR      : { r: 0x00, g: 0x00, b: 0x00 },
    PROPERTY_COLOR    : { r: 0x56, g: 0x56, b: 0x56 },
    HIGHLIGHT_COLOR   : { r: 0x37, g: 0x81, b: 0xbf },
    SELECT_BACK_COLOR : { r: 0x27, g: 0x27, b: 0x27 },
    CHECK_BACK_COLOR  : { r: 0x66, g: 0x66, b: 0x66 },
    SELECTION_COLOR   : { r: 0xc4, g: 0x8b, b: 0x43 },
}

export const lightTheme: ColorTheme = {
    BACKGROUND_COLOR  : { r: 0xFF, g: 0xFF, b: 0xFF },
    NODE_BACK_COLOR   : { r: 0x85, g: 0x85, b: 0x85 },
    FRAME_BACK_COLOR  : { r: 0x55, g: 0x70, b: 0x55 },
    FRAME_COLOR_ALPHA  : 0.9,
    TEXT_COLOR        : { r: 0xFF, g: 0xFF, b: 0xFF },
    BORDER_COLOR      : { r: 0x00, g: 0x00, b: 0x00 },
    PROPERTY_COLOR    : { r: 0x56, g: 0x56, b: 0x56 },
    HIGHLIGHT_COLOR   : { r: 0x37, g: 0x81, b: 0xbf },
    SELECT_BACK_COLOR : { r: 0x27, g: 0x27, b: 0x27 },
    CHECK_BACK_COLOR  : { r: 0x66, g: 0x66, b: 0x66 },
    SELECTION_COLOR   : { r: 0xc4, g: 0x8b, b: 0x43 },
}

export function rgb(color: IColor, alpha = 1) {
    return `rgb(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function offsetColor(color: IColor, offset: number): IColor {
    function clamp(color: number) {
        return Math.max(Math.min(color, 255), 0);
    }
    return {
        r: clamp(color.r + offset),
        g: clamp(color.g + offset),
        b: clamp(color.b + offset)
    };
}