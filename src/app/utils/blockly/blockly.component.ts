//For more info https://www.npmjs.com/package/ngx-blockly
//https://developers.google.com/blockly/guides/configure/web/toolbox#xml_1

//Blockly Developer Tools https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category,Separator,
  LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY,TEXT_CATEGORY, LISTS_CATEGORY,COLOUR_CATEGORY,VARIABLES_CATEGORY,FUNCTIONS_CATEGORY,
  NgxToolboxBuilderService, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, CustomBlock } from 'ngx-blockly';
import { TestBlock } from './custom-blocks/test.block';
import { TfMainTfBlock} from './terraform-blocks/tf.main.tf.block';
import { TfRequiredProviderBlock} from './terraform-blocks/tf.required.provider.block';
import { TfProviderBlock } from './terraform-blocks/tf.provider.block';
import { TfVariableBlock } from './terraform-blocks/tf.variable.block';
import { TfKeyValuePairedObjBlock } from './terraform-blocks/tf.keyvaluepaired.obj.block';
import { TfKeyValuePairBlock } from './terraform-blocks/tf.keyvaluepair.block';
import { TfDataBlock } from './terraform-blocks/tf.data.block';
import { TfResourceBlock } from './terraform-blocks/tf.resource.block';
import { TfListCreateWithEmptyBlock } from './terraform-blocks/tf.list.block';
declare var Blockly: any;

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {
  @ViewChild(NgxBlocklyComponent) workspace;

  public config: NgxBlocklyConfig = {
    toolbox: '<xml id="toolbox" style="display: none">' +
                '<block type="controls_if"></block>' +
                '<block type="controls_repeat_ext"></block>' +
                '<block type="logic_compare"></block>' +
                '<block type="math_number"></block>' +
                '<block type="math_arithmetic"></block>' +
                '<block type="text"></block>' +
                '<block type="text_print"></block>' +
             '</xml>',
    scrollbars: true,
    trashcan: true
};

public generatorConfig: NgxBlocklyGeneratorConfig = {
  dart: true,
  javascript: true,
  lua: true,
  php: true,
  python: true,
  xml: true
};

public customBlocks: CustomBlock[] = [
  //new TestBlock('test', null, null),
  new TfMainTfBlock('tf_main_tf', null, null),
  new TfRequiredProviderBlock('tf_required_provider', null, null),
  new TfProviderBlock('tf_provider', null, null),
  new TfVariableBlock('tf_variable', null, null),
  new TfKeyValuePairedObjBlock('tf_keyvalue_paired_obj', null, null),
  new TfKeyValuePairBlock('tf_keyvaluepair',null, null),
  new TfDataBlock('tf_data',null,null),
  new TfResourceBlock('tf_resource',null,null),
  new TfListCreateWithEmptyBlock('lists_repeat',null,null),
];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {

    ngxToolboxBuilder.nodes = [
               //new Category('Test', '#FF00FF',this.customBlocks, null),
               new Category('Terraform', '#FF33FF',this.customBlocks,null),
               LOGIC_CATEGORY,
               LOOP_CATEGORY,
               MATH_CATEGORY,
               TEXT_CATEGORY,
               new Separator(), //Add Separator
               LISTS_CATEGORY,
               COLOUR_CATEGORY,
               VARIABLES_CATEGORY,
               FUNCTIONS_CATEGORY
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
   }

  ngOnInit(): void {
    this.attachResizeEventToBlockly();
  }
  
  attachResizeEventToBlockly() {
    var blocklyDiv = document.getElementsByName('blocklyToolboxDiv')[0];
    var workspace = Blockly.inject(blocklyDiv,
      {toolbox: document.getElementById('toolbox')});
    window.addEventListener('resize', onresize, false);
    this.onresize(null);
    Blockly.svgResize(workspace);
  }

  onresize = (event) => {
    var blocklyArea  = document.getElementById('blockly');
    var blocklyDiv = document.getElementsByName('blocklyToolboxDiv')[0];
    var workspace = Blockly.inject(blocklyDiv,
      {toolbox: document.getElementById('toolbox')});
  
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let elm = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += elm.offsetLeft;
      y += elm.offsetTop;
      elm = <HTMLCanvasElement>elm.offsetParent;
    } while (elm);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
  };

  onCode = (code: any) => {
    console.log(code);
  }

  onExport = () => {
        // Returns formatted xml of workspace
        this.workspace.toXml();
  }

  onLoadWorkspace = (xml:any) => {
        // Add xml to workspace (clears previous elements)
        this.workspace.fromXml(xml);
  }
  onAppendToWorkspace = (xml:any) =>{
        // Append xml to workspace
        this.workspace.appendFromXml(xml);
  }

  onWorkspaceChange = (event:any) => {

  }
  onToolboxChange = (event:any) => {
    
  }
}
