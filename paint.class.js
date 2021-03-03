import { Tool_LINE, Tool_RECTANGLE, Tool_CIRCLE, Tool_TRIANGLE, Tool_PAINT_BUCKET, Tool_PENCIL, Tool_BRUSH, Tool_ERASER } from './tool.js';
import { getMouseCoordOnCanvas, findDistance } from './utility.js';
import Fill from './fill.class.js';
export default class Paint {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.undoStack = [];
        this.undoLimit = 3;
    }
    set activeTool(tool) {
        this.tool = tool;
    }
    set lineWidth(linewidth) {
        this._lineWidth = linewidth;
        this.context.lineWidth = this._lineWidth;
    }
    set brushSize(brushsize) {
        this._brushSize = brushsize;
    }
    set selectedColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
    }
    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }
    onMouseDown(e) {
        this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        console.log(this.undoStack.length);
        if (this.undoStack.length >= this.undoLimit)
            this.undoStack.shift();
        this.undoStack.push(this.savedData);
        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);
        this.startPos = getMouseCoordOnCanvas(e, this.canvas);
        if (this.tool == Tool_PENCIL || this.tool == Tool_BRUSH) {
            this.context.beginPath();
            this.context.moveTo(this.startPos.x, this.startPos.y);
        }
        else if (this.tool == Tool_PAINT_BUCKET) {
            new Fill(this.canvas, this.startPos, this.color);
        }
        else if (this.tool === Tool_ERASER) {
            this.context.clearRect(this.startPos.x, this.startPos.y, this._brushSize, this._brushSize);
        }
    }
    onMouseMove(e) {
        this.currentPos = getMouseCoordOnCanvas(e, this.canvas);
        switch (this.tool) {
            case Tool_LINE:
            case Tool_RECTANGLE:
            case Tool_CIRCLE:
            case Tool_TRIANGLE:
                this.drawShape();
                break;
            case Tool_PENCIL:
                this.drawFreeLine(this._lineWidth);
                break;
            case Tool_BRUSH:
                this.drawFreeLine(this._brushSize);
                break;
            case Tool_ERASER:
                this.context.clearRect(this.currentPos.x, this.currentPos.y, this._brushSize, this._brushSize);
                break;
            default:
                break;
        }
    }
    onMouseUp(e) {
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }
    drawShape() {
        this.context.putImageData(this.savedData, 0, 0);
        this.context.beginPath();
        if (this.tool == Tool_LINE) {
            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
        }
        else if (this.tool == Tool_RECTANGLE) {
            this.context.rect(this.startPos.x, this.startPos.y, (this.currentPos.x - this.startPos.x), (this.currentPos.y - this.startPos.y));
        }
        else if (this.tool == Tool_CIRCLE) {
            let dist = findDistance(this.startPos, this.currentPos);
            this.context.arc(this.startPos.x, this.startPos.y, dist, 0, 2 * Math.PI, false);
        }
        else if (this.tool == Tool_TRIANGLE) {
            this.context.moveTo((this.startPos.x + (this.currentPos.x - this.startPos.x) / 2), (this.startPos.y));
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
            this.context.closePath();
        }
        this.context.stroke();
    }
    drawFreeLine(lineWidth1) {
        this.context.lineWidth = lineWidth1;
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }
    undoPaint() {
        if (this.undoStack.length > 0) {
            this.context.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
            this.undoStack.pop();
        }
        else {
            alert('no undo available');
        }
    }
}
//# sourceMappingURL=paint.class.js.map