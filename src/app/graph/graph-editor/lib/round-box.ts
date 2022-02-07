import { rgb } from "./models/i-color-theme";
import { AllCorner, Corner } from "./enums/corner.enum";
import { Rectangle } from "./geometry/rectangle";
import { Renderer } from "./renderer";

export class RoundBox {
   
    private fillColor: string;
    private strokeColor: string;
    private roundCorners: number;
    private hasShadow = false;
    private isFilled = false;
    private isStroked = false;
    private lineWidth: number = 1;
    private clippedBox: Rectangle = null;

    constructor(private renderer: Renderer, private radius: number) {
        this.fillColor = rgb(renderer.theme.PROPERTY_COLOR);
        this.strokeColor = rgb(renderer.theme.BORDER_COLOR);
        this.roundCorners = AllCorner;
    }

    filled(color: string) {
        this.fillColor = color;
        this.isFilled = true;
        return this;
    }

    line(width: number) {
        this.lineWidth = width;
        return this;
    }

    stroke(color: string) {
        this.strokeColor = color;
        this.isStroked = true;
        return this;
    }

    corners(corners: number) {
        this.roundCorners = corners;
        return this;
    }

    shadow(hasShadow: boolean = true) {
        this.hasShadow = hasShadow;
        return this;
    }

    clipped(clipBox: Rectangle) {
        this.clippedBox = clipBox;
        return this;
    }

    draw(bounds: Rectangle) {
        this.renderer.context.save();
        if (this.isFilled) {
            this.renderer.context.fillStyle = this.fillColor;
        }
        if (this.isStroked) {
            this.renderer.context.lineWidth = this.lineWidth;
            this.renderer.context.strokeStyle = this.strokeColor;
        }
        this.renderer.context.beginPath();
        this.renderer.context.moveTo(bounds.origin.x + bounds.dimension.width / 2, bounds.origin.y);
        if (this.roundCorners & Corner.TopRight) {
            this.renderer.context.lineTo(bounds.corner().x - this.radius, bounds.origin.y);
            this.renderer.context.arcTo(bounds.corner().x, bounds.origin.y, bounds.corner().x, bounds.origin.y + this.radius, this.radius);
        } else {
            this.renderer.context.lineTo(bounds.corner().x, bounds.origin.y);
        }
        if (this.roundCorners & Corner.BottomRight) {
            this.renderer.context.lineTo(bounds.corner().x, bounds.corner().y - this.radius);
            this.renderer.context.arcTo(bounds.corner().x, bounds.corner().y, bounds.corner().x - this.radius, bounds.corner().y, this.radius);
        } else {
            this.renderer.context.lineTo(bounds.corner().x, bounds.corner().y);
        }
        if (this.roundCorners & Corner.BottomLeft) {
            this.renderer.context.lineTo(bounds.origin.x + this.radius, bounds.corner().y);
            this.renderer.context.arcTo(bounds.origin.x, bounds.corner().y, bounds.origin.x, bounds.corner().y - this.radius, this.radius);
        } else {
            this.renderer.context.lineTo(bounds.origin.x, bounds.corner().y);
        }
        if (this.roundCorners & Corner.TopLeft) {
            this.renderer.context.lineTo(bounds.origin.x, bounds.origin.y + this.radius);
            this.renderer.context.arcTo(bounds.origin.x, bounds.origin.y, bounds.origin.x + this.radius, bounds.origin.y, this.radius);
        } else {
            this.renderer.context.lineTo(bounds.origin.x, bounds.origin.y);
        }

        if (this.clippedBox) {
            this.renderer.context.clip();
            this.renderer.context.beginPath();
            this.renderer.context.rect(this.clippedBox.origin.x, this.clippedBox.origin.y,
                this.clippedBox.dimension.width, this.clippedBox.dimension.height);
        }
        this.renderer.context.closePath();
        
        if (this.hasShadow) {
            this.renderer.context.shadowColor = "black";
            this.renderer.context.shadowBlur = 10;
            this.renderer.context.shadowOffsetX = 0;
            this.renderer.context.shadowOffsetY = 4;
        }
        if (this.isFilled) {
            this.renderer.context.fill();
        }
        if (this.isStroked) {
            this.renderer.context.stroke();
        }
        this.renderer.context.restore();
    }
}