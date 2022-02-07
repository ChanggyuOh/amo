import { Align } from "./enums/align.enum";
import { IColor, offsetColor } from "./models/i-color";
import { ColorTheme, rgb } from "./models/i-color-theme";
import { Direction } from "./enums/direction.enum";
import { Dimension } from "./geometry/dimension";
import { Point } from "./geometry/point";
import { Rectangle } from "./geometry/rectangle";
import { IGraphicalHelper } from "./models/i-graphical-helper";
import { RoundBox } from "./round-box";
import { IStyleDimension } from "./models/i-style-dimension";
import { ZoomState } from "./zoom-state";

export class Renderer {
    
    
    public style: IStyleDimension;
    
    constructor(public context: CanvasRenderingContext2D,
                public size: Dimension,
                public theme: ColorTheme,
                public graphicalHelper: IGraphicalHelper) {
        this.computeStyle();
    }

    public setSize(size: Dimension) {
        this.size = size;
        this.computeStyle();
    }

    private computeStyle() {
        // TODO put font in theme
        this.context.font = "16px Roboto";
        const m = this.context.measureText("Hp");
        const unit = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) / 2;
        this.style = {
            unit,
            headerHeight: unit * 5,
            roundRadius: unit,
            connectorRadius: unit,
            collapseArrowSize: unit * 2,
            snapSize: unit * 3,
        };
    }

    setProjection(state: ZoomState) {
        this.context.scale(state.scale, state.scale);
        this.context.translate(-state.origin.x, -state.origin.y);
    }

    getPosition(zoomState: ZoomState, position: Point): Point {
        return new Point(zoomState.origin.x + position.x / zoomState.scale, zoomState.origin.y + position.y / zoomState.scale);
    }

    clearScreen(color: IColor) {
        this.context.fillStyle = rgb(color);
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    drawGrid(zoomState: ZoomState, color: IColor, stepSize: number, stepCount: number, levelCount: number) {
        const rect = this.getPosition(zoomState, new Point(0, 0))
            .rectTo(this.getPosition(zoomState, new Point(this.size.width, this.size.height)));
        let offset = 10 * levelCount;
        let levelStep = stepSize;

        this.context.lineWidth = 1;

        for (let level = 0; level < levelCount; ++level) {
            this.context.strokeStyle = rgb(offsetColor(color, offset));
            this.context.beginPath();

            let i = Math.round(rect.origin.x / levelStep);
            for (let start = i * levelStep; start < rect.corner().x; start += levelStep, ++i) {
                if (i == 0 || (level < levelCount - 1 && i % stepCount == 0)) {
                    continue;
                }
                this.context.moveTo(start, rect.origin.y);
                this.context.lineTo(start, rect.corner().y);
            }

            i = Math.round(rect.origin.y / levelStep);
            for (let start = i * levelStep; start < rect.corner().y; start += levelStep, ++i) {
                if (i == 0 || (level < levelCount - 1 && i % stepCount == 0)) {
                    continue;
                }
                this.context.moveTo(rect.origin.x, start);
                this.context.lineTo(rect.corner().x, start);
            }

            this.context.stroke();

            levelStep *= stepCount;
            offset -= 10;
        }
    }

    drawConnection(fromPos: Point, toPos: Point, color: IColor) {
        const gap = (toPos.x - fromPos.x) / 3;
        this.context.beginPath();
        this.context.moveTo(fromPos.x, fromPos.y);
        this.context.bezierCurveTo(fromPos.x + gap, fromPos.y, toPos.x - gap, toPos.y, toPos.x, toPos.y);
        this.context.lineWidth = 6;
        this.context.strokeStyle = rgb(offsetColor(this.theme.BORDER_COLOR, -20));
        this.context.stroke();
        this.context.lineWidth = 4;
        this.context.strokeStyle = rgb(color);
        this.context.stroke();
    }

    drawArrow(origin: Point, size: number, direction: Direction, color: string) {
        this.context.save();
        this.context.translate(origin.x, origin.y);
        if (direction == Direction.RIGHT) {
            this.context.rotate(-Math.PI / 2);
        } else if (direction == Direction.LEFT) {
            this.context.rotate(Math.PI / 2);
        }
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(-size / 2, -size / 2);
        this.context.lineTo(size / 2, -size / 2);
        this.context.lineTo(0, size / 2);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }

    roundBox(radius = this.style.roundRadius) {
        return new RoundBox(this, radius);
    }

    drawText(position: Point, color: string, text: string, align = Align.LEFT) {
        this.context.fillStyle = color;
        if (align == Align.RIGHT) {
            const tw = this.context.measureText(text).width;
            position = position.offset(-tw, 0);
        } else if (align == Align.CENTER) {
            const tw = this.context.measureText(text).width;
            position = position.offset(-tw / 2, 0);
        }
        this.context.fillText(text, position.x, position.y); 
    }

    private drawCheckMark(position: Point, color: string) {
        this.context.lineWidth = 3;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(position.x + this.style.unit * 0.5, position.y + this.style.unit * 1.5);
        this.context.lineTo(position.x + this.style.unit * 1.25, position.y + this.style.unit * 2.25);
        this.context.lineTo(position.x + this.style.unit * 2.5, position.y + this.style.unit * 0.5);
        this.context.stroke();
    }

    checkboxRect(position: Point) {
        return new Rectangle(position.x, position.y, this.style.unit * 3, this.style.unit * 3);
    }

    drawCheckBox(box: Rectangle, checked: boolean) {
        //const box = this.checkboxRect(position);
        this.roundBox()
            .filled(rgb(checked ? this.theme.HIGHLIGHT_COLOR : this.theme.CHECK_BACK_COLOR))
            .draw(box)
        if (checked) {
            this.drawCheckMark(box.origin, rgb(this.theme.TEXT_COLOR));
        }
    }

    drawConnector(position: Point, color: string, isNewPort: boolean) {
        this.context.fillStyle = color;
        this.context.lineWidth = 1;
        this.context.strokeStyle = rgb(this.theme.BORDER_COLOR);
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.style.connectorRadius, 0, Math.PI * 2);
        this.context.closePath();
        if (isNewPort) {
            this.context.globalAlpha = 0.5;
        }
        this.context.fill();
        if (isNewPort) {
            this.context.globalAlpha = 1;
        }
        this.context.stroke();
    }

    drawSelection(bounds: Rectangle) {
        this.context.strokeStyle = rgb(this.theme.NODE_BACK_COLOR);
        this.context.lineWidth = 2;
        this.context.setLineDash([5, 5]);
        this.context.beginPath();
        this.context.rect(bounds.origin.x, bounds.origin.y, bounds.dimension.width, bounds.dimension.height);
        this.context.stroke();
        this.context.setLineDash([]);
    }

    drawImage(image: CanvasImageSource, bounds: Rectangle) {
        this.context.drawImage(image, bounds.origin.x, bounds.origin.y, bounds.dimension.width, bounds.dimension.height);
    }
}