// console.log("start painting")

import {Tool_LINE,Tool_RECTANGLE, Tool_CIRCLE,Tool_TRIANGLE,Tool_PAINT_BUCKET,Tool_PENCIL,Tool_BRUSH,Tool_ERASER}   from './tool.js';
import Paint from './paint.class.js';


let paint = new Paint('canvas');
paint.activeTool = Tool_LINE;
paint.lineWidth = 1;
paint.brushSize = 4;
paint.selectedColor = "#000000";
paint.init();


class paintingApp {
    groupcommand : NodeListOf<HTMLElement>;
    groupShape: NodeListOf<HTMLElement>;
    linewidth: NodeListOf<HTMLElement>;
    swatches: NodeListOf<HTMLElement>;
    brushwidth: NodeListOf<HTMLElement>;

    constructor(){
        this.groupcommand = document.querySelectorAll('[data-command]')! as NodeListOf<HTMLElement>;
        this.groupShape = document.querySelectorAll('[data-tool]')! as NodeListOf<HTMLElement>;
        this.linewidth = document.querySelectorAll('[data-line-width]')! as NodeListOf<HTMLElement>;
        this.swatches = document.querySelectorAll('[data-color]')! as NodeListOf<HTMLElement>;
        this.brushwidth = document.querySelectorAll('[data-brush-width ]')! as NodeListOf<HTMLElement>;


        //console.log(this.groupcommand);

        this.groupcommand.forEach( item => {
            item.addEventListener('click', e =>{
                //console.log(item.getAttribute('data-command'))
               // console.log(e.target)
                let command = item.getAttribute('data-command');

                if(command === 'undo'){
                    
                    paint.undoPaint();
                }else if(command === "download"){
                    let canvas = document.getElementById('canvas')! as HTMLCanvasElement
                    let image = canvas.toDataURL("image/png",1.0)
                    .replace('image/png', 'image/octet-stream');
                    var link =document.createElement('a');
                    link.download = "my-image.png";
                    link.href = image;
                    link.click();
                }           
             })
        });

        this.groupShape.forEach(item => {
            item.addEventListener('click', e =>{
                document.querySelector('[data-tool].active')!.classList.toggle('active');
                //console.log(item.getAttribute('data-tool'));
                item.classList.toggle('active');

                let selectedTool:string  =item.getAttribute('data-tool')!;

                paint.activeTool = selectedTool;

                switch(selectedTool){
                    case Tool_LINE:
                    case Tool_RECTANGLE:
                    case Tool_CIRCLE:
                    case Tool_TRIANGLE:
                    case Tool_PENCIL:
                        // activate shape group
                        (document.querySelector('.group.for-shapes')! as HTMLElement).style.display = "block";
                        // deactivate brush linewidth group
                        (document.querySelector('.group.for-brush')! as HTMLElement).style.display = "none";
                        break;

                    case Tool_BRUSH:  
                    case Tool_ERASER: 
                    //  deactivate shape group  
                    (document.querySelector('.group.for-brush')! as HTMLElement).style.display = "block";
                     // activate brush linewidth group
                     (document.querySelector('.group.for-shapes')! as HTMLElement).style.display = "none";
                        break;
                    default:
                        //make invisible both linewidths groups
                        (document.querySelector('.group.for-shapes')! as HTMLElement).style.display = "none";
                        (document.querySelector('.group.for-brush')! as HTMLElement).style.display = "none";
                }
            })
        });


        this.linewidth.forEach(item =>{
            item.addEventListener('click', e =>{
                document.querySelector('[data-line-width].active')!.classList.toggle('active');
                //console.log(item.getAttribute('data-line-width'));
                item.classList.toggle('active');


                let linewidth = item.getAttribute('data-line-width');
                paint.lineWidth = linewidth;
            })
        });


        this.brushwidth.forEach(item =>{
            item.addEventListener('click', e =>{
                document.querySelector('[data-brush-width].active')!.classList.toggle('active');
                //console.log(item.getAttribute('data-brush-width'));
                item.classList.toggle('active');


                let brushSize1 = item.getAttribute('data-brush-width');
                paint.brushSize = brushSize1;
            })
        });

        this.swatches.forEach(item => {
            item.addEventListener('click', e=>{
                document.querySelector('[data-color].active')!.classList.toggle('active');
                //console.log(item.getAttribute('data-color'));
                item.classList.toggle('active');

                let color = item.getAttribute('data-color');
                paint.selectedColor = color;
            })

        })

    }
}

const paintCanvas = new paintingApp();