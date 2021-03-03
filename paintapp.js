import { Tool_LINE, Tool_RECTANGLE, Tool_CIRCLE, Tool_TRIANGLE, Tool_PENCIL, Tool_BRUSH, Tool_ERASER } from './tool.js';
import Paint from './paint.class.js';
let paint = new Paint('canvas');
paint.activeTool = Tool_LINE;
paint.lineWidth = 1;
paint.brushSize = 4;
paint.selectedColor = "#000000";
paint.init();
class paintingApp {
    constructor() {
        this.groupcommand = document.querySelectorAll('[data-command]');
        this.groupShape = document.querySelectorAll('[data-tool]');
        this.linewidth = document.querySelectorAll('[data-line-width]');
        this.swatches = document.querySelectorAll('[data-color]');
        this.brushwidth = document.querySelectorAll('[data-brush-width ]');
        this.groupcommand.forEach(item => {
            item.addEventListener('click', e => {
                let command = item.getAttribute('data-command');
                if (command === 'undo') {
                    paint.undoPaint();
                }
                else if (command === "download") {
                    let canvas = document.getElementById('canvas');
                    let image = canvas.toDataURL("image/png", 1.0)
                        .replace('image/png', 'image/octet-stream');
                    var link = document.createElement('a');
                    link.download = "my-image.png";
                    link.href = image;
                    link.click();
                }
            });
        });
        this.groupShape.forEach(item => {
            item.addEventListener('click', e => {
                document.querySelector('[data-tool].active').classList.toggle('active');
                item.classList.toggle('active');
                let selectedTool = item.getAttribute('data-tool');
                paint.activeTool = selectedTool;
                switch (selectedTool) {
                    case Tool_LINE:
                    case Tool_RECTANGLE:
                    case Tool_CIRCLE:
                    case Tool_TRIANGLE:
                    case Tool_PENCIL:
                        document.querySelector('.group.for-shapes').style.display = "block";
                        document.querySelector('.group.for-brush').style.display = "none";
                        break;
                    case Tool_BRUSH:
                    case Tool_ERASER:
                        document.querySelector('.group.for-brush').style.display = "block";
                        document.querySelector('.group.for-shapes').style.display = "none";
                        break;
                    default:
                        document.querySelector('.group.for-shapes').style.display = "none";
                        document.querySelector('.group.for-brush').style.display = "none";
                }
            });
        });
        this.linewidth.forEach(item => {
            item.addEventListener('click', e => {
                document.querySelector('[data-line-width].active').classList.toggle('active');
                item.classList.toggle('active');
                let linewidth = item.getAttribute('data-line-width');
                paint.lineWidth = linewidth;
            });
        });
        this.brushwidth.forEach(item => {
            item.addEventListener('click', e => {
                document.querySelector('[data-brush-width].active').classList.toggle('active');
                item.classList.toggle('active');
                let brushSize1 = item.getAttribute('data-brush-width');
                paint.brushSize = brushSize1;
            });
        });
        this.swatches.forEach(item => {
            item.addEventListener('click', e => {
                document.querySelector('[data-color].active').classList.toggle('active');
                item.classList.toggle('active');
                let color = item.getAttribute('data-color');
                paint.selectedColor = color;
            });
        });
    }
}
const paintCanvas = new paintingApp();
//# sourceMappingURL=paintapp.js.map