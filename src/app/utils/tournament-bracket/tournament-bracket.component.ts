import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tournament-bracket',
  templateUrl: './tournament-bracket.component.html',
  styleUrls: ['./tournament-bracket.component.css']
})
export class TournamentBracketComponent implements AfterViewInit {
  @ViewChild('svg1')   svg: ElementRef;
  @ViewChild('red')    red: ElementRef;
  @ViewChild('teal')   teal: ElementRef;
  @ViewChild('orange') orange: ElementRef;
  @ViewChild('aqua')   aqua: ElementRef;
  @ViewChild('purple') purple: ElementRef;
  @ViewChild('green')  green: ElementRef;
  @ViewChild('path1')  path1: ElementRef;
  @ViewChild('path2')  path2: ElementRef;
  @ViewChild('path3')  path3: ElementRef;
  @ViewChild('path4')  path4: ElementRef;
  @ViewChild('path5')  path5: ElementRef;
  @ViewChild('path6')  path6: ElementRef;
  constructor() { }

  ngAfterViewInit() {
    this.componentReady();
  }
//helper functions, it turned out chrome doesn't support Math.sgn() 
signum=(x:number):number=> {
  return (x < 0) ? -1 : 1;
}
absolute=(x:number):number => {
  return (x < 0) ? -x : x;
}

drawPath = (svg:ElementRef, path:ElementRef, startX:number, startY:number, endX:number, endY:number):void => {
  // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
  var stroke =  parseFloat(path.nativeElement.attributes["stroke-width"]);
  // check if the svg is big enough to draw the path, if not, set heigh/width
  
  var h = svg.nativeElement.attributes["height"].value;
  var w = svg.nativeElement.attributes["width"].value;
  if (h <  endY)                 svg.nativeElement.setAttribute("height", endY);
  if (w < (startX + stroke) )    svg.nativeElement.setAttribute("width", (startX + stroke));
  if (w < (endX   + stroke) )    svg.nativeElement.setAttribute("width", (endX   + stroke));
  
  var deltaX = (endX - startX) * 0.15;
  var deltaY = (endY - startY) * 0.15;
  // for further calculations which ever is the shortest distance
  var delta  =  deltaY < this.absolute(deltaX) ? deltaY : this.absolute(deltaX);

  // set sweep-flag (counter/clock-wise)
  // if start element is closer to the left edge,
  // draw the first arc counter-clockwise, and the second one clock-wise
  var arc1 = 0; var arc2 = 1;
  if (startX > endX) {
      arc1 = 1;
      arc2 = 0;
  }
  // draw tha pipe-like path
  // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
  path.nativeElement.setAttribute("d",  "M"  + startX + " " + startY +
                  " V" + (startY + delta) +
                  " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*this.signum(deltaX)) + " " + (startY + 2*delta) +
                  " H" + (endX - delta* this.signum(deltaX)) + 
                  " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                  " V" + endY );
}

connectElements = (svg:ElementRef, path:ElementRef, startElem:ElementRef, endElem:ElementRef):void => {

  var svgContainer= document.getElementById("svgContainer");

  // if first element is lower than the second, swap!
  if(startElem.nativeElement.offsetTop > endElem.nativeElement.offsetTop){
      var temp = startElem;
      startElem = endElem;
      endElem = temp;
  }

  // get (top, left) corner coordinates of the svg container   
  var svgTop  = svgContainer.offsetTop;
  var svgLeft = svgContainer.offsetLeft;

  // calculate path's start (x,y)  coords
  // we want the x coordinate to visually result in the element's mid point
  var startX = startElem.nativeElement.offsetLeft + 0.5* startElem.nativeElement.offsetWidth - svgLeft;    // x = left offset + 0.5*width - svg's left offset
  var startY = startElem.nativeElement.offsetTop  + startElem.nativeElement.offsetWidth - svgTop;        // y = top offset + height - svg's top offset

      // calculate path's end (x,y) coords
  var endX = endElem.nativeElement.offsetLeft + 0.5*endElem.nativeElement.offsetWidth - svgLeft;
  var endY = endElem.nativeElement.offsetTop  - svgTop;

  console.log(svg);
  console.log(path);
  console.log(startX);
  console.log(startY);
  console.log(endX);
  console.log(endY);
  // call function for drawing the path
  this.drawPath(svg, path, startX, startY, endX, endY);
}



connectAll = () => {
  
  // connect all the paths you want!
  this.connectElements(this.svg, this.path1, this.teal,   this.orange);
  this.connectElements(this.svg, this.path2, this.red,    this.orange);
  this.connectElements(this.svg, this.path3, this.teal,   this.aqua);
  this.connectElements(this.svg, this.path4, this.red,    this.aqua); 
  this.connectElements(this.svg, this.path5, this.purple, this.teal);
  this.connectElements(this.svg, this.path6, this.orange, this.green);

}

  componentReady = () => {
    console.log(this.svg);
    this.svg.nativeElement.setAttribute("height", "1500");
    this.svg.nativeElement.setAttribute("width", "1500");
    this.connectAll();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    // reset svg each time 
    this.componentReady();
  }
}
