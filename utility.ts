import Point from './point.model.js'

export function getMouseCoordOnCanvas(e: MouseEvent, canvas: HTMLCanvasElement){

    let rect =canvas.getBoundingClientRect();
    let x :number = Math.round(e.clientX - rect.left);
    let y: number = Math.round(e.clientY - rect.top);
    return new Point(x,y);
    
}


export function findDistance(coord1: MouseEvent, coord2:MouseEvent){
    let exp1:number = Math.pow(coord2.x -coord1.x, 2);
    let exp2:number = Math.pow (coord2.y-coord1.y,2);

    let distance: number = Math.sqrt(exp1 + exp2);

    return distance;



}