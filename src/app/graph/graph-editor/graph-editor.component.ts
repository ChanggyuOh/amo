import { Component, OnInit } from '@angular/core';
import { ColorSelector } from '../image-kit/lib/color-selector';
import { GeglGraphicalHelper, geglNodeDefinitions } from '../image-kit/lib/gegl';
import { DefaultGraphNodeRegistry } from './lib/default-graph-node-registry';
import { GraphEditor } from './lib/graph-editor';
import { IOptions } from './lib/models/i-options';
import { GraphNodeFactory } from './lib/graph-node-factory';
import { INodeGroupIO } from './lib/models/i-node-group-io';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrls: ['./graph-editor.component.css']
})
export class GraphEditorComponent implements OnInit {
      // Create and customize editor
      graphicalHelper = new GeglGraphicalHelper();
      nodeFactory = new GraphNodeFactory(new DefaultGraphNodeRegistry(geglNodeDefinitions));
      editor: GraphEditor;
      option: IOptions;

      // Set graph to edit
      graph: INodeGroupIO = {
        nodes: [
          { id: "n0", type: "gegl:png-load", location: { x: 100, y: 100} },
          { id: "n6", type: "ratatest", location: { x: 100, y: 500} },
          { kind: "frame", label: "Test", nodes: [
            { id: "n1", type: "gimp:colorize", location: { x: 400, y: 100}, properties: { "color": { r: 128, g: 53, b: 96 } } },
            { id: "n2", type: "gegl:png-save", location: { x: 700, y: 100} },
          ] },
          { id: "n3", type: "gegl:exp-combine", location: { x: 500, y: 500}, fullWidth: 250, properties: { "exposure": { "a": "Allo?" } } },
        ],
        connections: [
          { from: { node: "n0", property: "output"}, to: { node: "n1", property: "input" } },
          { from: { node: "n0", property: "output"}, to: { node: "n3", property: "exposure.a" } },
          { from: { node: "n1", property: "output"}, to: { node: "n2", property: "input" } },
        ],
        canvas: {
          position: { x: 0, y: 0 },
          zoom: 1.0
        }
      };

      // Update previews
      img = new Image();
      
  constructor() {
   }

  ngOnInit(): void {
    this.option = {
      container: document.querySelector("#graphnodecontainer"),
      graphicalHelper: this.graphicalHelper,
      nodeFactory: this.nodeFactory
    };

    this.editor = new GraphEditor(this.option);
    this.editor.registerSelector("select-color", new ColorSelector());
    this.editor.onGraphChange(nodeGroup => {
      console.log("GRAPH CHANGE", nodeGroup);
      console.log("GRAPH SAVE", this.editor.save());
    });
    this.img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = this.img.width;
      canvas.height = this.img.height;
      ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
      const imageData = ctx.getImageData(0, 0, this.img.width, this.img.height);
      const args = {};
      args["n0"] = imageData;
      this.editor.updatePreviews(args);
    };
    this.img.src = "cat.png";
    this.editor.load(this.graph);
  }

}
