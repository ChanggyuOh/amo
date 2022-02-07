import { IColor } from "../../graph-editor/lib/models/i-color";
import { Point } from "../../graph-editor/lib/geometry/point";
import { rgb } from "../../graph-editor/lib/models/i-color-theme";
import { Selector } from "../../graph-editor/lib/selector";
import { HsvColor } from "./i-hsv-color";

export function convertColorFromString(value: string): IColor {
    function getHex(index: number) {
        return parseInt(value.substring(index*2+1, index*2+3), 16);
    }
    if (value.startsWith('#') && value.length >= 7) {
        return {
            r: getHex(0),
            g: getHex(1),
            b: getHex(2)
        };
    }
    return { r: 0, g: 0, b: 0 };
}

export function convertColorToString(color: IColor): string {
    function toHex(value: number) {
        const x = "0" + value.toString(16);
        return x.substring(x.length-2, x.length);
    }
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

export function hsvToRgb(H: number, S: number, V: number): IColor {
    const C = V * S;
    const X = C * (1 - Math.abs((H / 60) % 2 - 1));
    const m = V - C;
    if (H < 60) {
        return { r: Math.floor((C+m)*255), g: Math.floor((X+m)*255), b: Math.floor((0+m)*255) };
    } else if (H < 120) {
        return { r: Math.floor((X+m)*255), g: Math.floor((C+m)*255), b: Math.floor((0+m)*255) };
    } else if (H < 180) {
        return { r: Math.floor((0+m)*255), g: Math.floor((C+m)*255), b: Math.floor((X+m)*255) };
    } else if (H < 240) {
        return { r: Math.floor((0+m)*255), g: Math.floor((X+m)*255), b: Math.floor((C+m)*255) };
    } else if (H < 300) {
        return { r: Math.floor((X+m)*255), g: Math.floor((0+m)*255), b: Math.floor((C+m)*255) };
    } else {
        return { r: Math.floor((C+m)*255), g: Math.floor((0+m)*255), b: Math.floor((X+m)*255) };            
    }
}

export function rgbToHsv({ r, g, b }: IColor): HsvColor {
    const Rp = r / 255;
    const Gp = g / 255;
    const Bp = b / 255;
    const Cmax = Math.max(Rp, Gp, Bp);
    const Cmin = Math.min(Rp, Gp, Bp);
    const delta  = Cmax - Cmin;
    let H = 0;
    let S = Cmax > 0 ? delta / Cmax : 0;
    let V = Cmax;
    if (delta == 0) {
        H = 0;
    } else if (Cmax == Rp) {
        H = ((Gp - Bp) / delta) % 6;
    } else if (Cmax == Gp) {
        H = ((Bp - Rp) / delta) + 2;
    } else {
        H = ((Rp - Gp) / delta) + 4;
    }
    H *= 60;
    return { h: H, s: S, v: V };
}

export class ColorSelector extends Selector {

    private hueSelectElement: HTMLCanvasElement;
    private lightSelectElement: HTMLCanvasElement;
    private resultElement: HTMLElement;
    private hueContext: CanvasRenderingContext2D;
    private lightContext: CanvasRenderingContext2D;
    private color: HsvColor = { h: 0, s: 0, v: 0 };

    private resolve: (value: any) => void;
    private reject: () => void;

    constructor() {
        super();
        this.hueSelectElement = document.createElement("canvas");
        this.hueSelectElement.width = 200;
        this.hueSelectElement.height = 50;
        this.hueSelectElement.addEventListener("click", e => this.selectHue(e));
        this.hueSelectElement.classList.add("hue");
        this.selectorEl.appendChild(this.hueSelectElement);

        this.lightSelectElement = document.createElement("canvas");
        this.lightSelectElement.width = 200;
        this.lightSelectElement.height = 200;
        this.lightSelectElement.addEventListener("click", e => this.selectSaturationLightness(e));
        this.lightSelectElement.classList.add("light");
        this.selectorEl.appendChild(this.lightSelectElement);

        this.resultElement = document.createElement("div");
        this.resultElement.addEventListener("click", e => this.selectColor());
        this.resultElement.classList.add("color-selection");
        this.selectorEl.appendChild(this.resultElement);
        
        this.hueContext = this.hueSelectElement.getContext("2d");
        this.lightContext = this.lightSelectElement.getContext("2d");
    }

    protected internalOpen(position: Point, ctxt: any): Promise<any> {
        const { value } = ctxt;
        this.color = rgbToHsv(value);
        this.draw();

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }

    private selectColor() {
        super.close();
        this.resolve(hsvToRgb(this.color.h, this.color.s, this.color.v));
    }

    close() {
        super.close();
        this.reject();
    }

    private draw()  {

        this.resultElement.style.backgroundColor = rgb(hsvToRgb(this.color.h, this.color.s, this.color.v));

        const width = 200;
        const height = 200;
        for (let i = 0; i < width; ++i) {
            this.hueContext.fillStyle = rgb(hsvToRgb((360 * i) / width, 1, 1));
            this.hueContext.beginPath();
            this.hueContext.rect(i, 0, 1, 50);
            this.hueContext.fill();
        }

        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                this.lightContext.fillStyle = rgb(hsvToRgb(this.color.h, x / width, 1 - (y / height)));
                this.lightContext.beginPath();
                this.lightContext.rect(x, y, 1, 1);
                this.lightContext.fill();
            }
        }
    }

    private selectHue(ev) {
        const rect = ev.target.getBoundingClientRect();
        this.color = {...this.color, h: Math.min(360, Math.max(0, 360 * (ev.clientX - rect.left) / rect.width)) };
        this.draw();
    }

    private selectSaturationLightness(ev) {
        const rect = ev.target.getBoundingClientRect();
        this.color = {...this.color,
            s: Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width)),
            v: Math.min(1, Math.max(0, 1 - (ev.clientY - rect.top) / rect.height))
        };
        this.draw();
    }
}