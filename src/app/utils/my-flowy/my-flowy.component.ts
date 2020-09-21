import { Component, OnInit } from '@angular/core';
declare const flowy: any;

@Component({
  selector: 'app-my-flowy',
  templateUrl: './my-flowy.component.html',
  styleUrls: ['./my-flowy.component.css']
})
export class MyFlowyComponent implements OnInit {
  myFlowy: any;
  spacing_x: number = 40;
  spacing_y: number = 100;

  constructor() { }

  ngOnInit(): void {
    this.myFlowy = flowy( document.getElementById('canvas'),
                          this.onGrab,
                          this.onRelease,
                          this.onSnap,
                          this.onRearrange, 
                          this.spacing_x, 
                          this.spacing_y);
  }

  /*
  Gets triggered when a user grabs a block with the class create-flowy

  Parameter	Type	                  Description
  block	    javascript DOM element	The block that has been grabbed
   */
  public onGrab = (block:any) => {
    // When the user grabs a block

  }

  /*
  Gets triggered when a user lets go of a block, regardless of whether it attaches or even gets released in the canvas.
  */
  public onRelease = () => {
    // When the user lets go of a block
  }

  /*
  Gets triggered when a block can attach to another parent block. You can either prevent the attachment, or allow it by using return true;

  Parameter	Type	                  Description
  block	    javascript DOM element	The block that has been grabbed
  first	    boolean	                If true, the block that has been dragged is the first one in the canvas
  parent	  javascript DOM element	The parent the block can attach to
   */
  public onSnap = (block:any, first:any, parent: any) => {
    // When a block can attach to a parent
    return true;
  }

  /*
  Gets triggered when blocks are rearranged and are dropped anywhere in the canvas, without a parent to attach to. You can either allow the blocks to be deleted, or prevent it and thus have them re-attach to their previous parent using return true.

  Parameter	Type	                  Description
  block	    javascript DOM element	The block that has been grabbed
  parent	  javascript DOM element	The parent the block can attach to
   */
  public onRearrange = (block:any, parent:any) => {
    // When a block is rearranged
    return true
  }

  public onShowData = () =>{
    console.log(JSON.stringify(this.myFlowy.output()));
  }
}
