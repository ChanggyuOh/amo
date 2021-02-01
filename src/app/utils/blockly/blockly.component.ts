//For more info https://www.npmjs.com/package/ngx-blockly
//https://developers.google.com/blockly/guides/configure/web/toolbox#xml_1

//Blockly Developer Tools https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category,Separator,
  LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY,TEXT_CATEGORY, LISTS_CATEGORY,COLOUR_CATEGORY,VARIABLES_CATEGORY,FUNCTIONS_CATEGORY,
  NgxToolboxBuilderService, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, CustomBlock } from 'ngx-blockly';
import { TestBlock } from './custom-blocks/test.block';
import { TfProviderBlock } from './terraform-blocks/tf.provider.block';
import { TfDataBlock } from './terraform-blocks/tf.data.block';
import { TfResourceBlock } from './terraform-blocks/tf.resource.block';
import { TfKeyValuePairBlock } from './terraform-blocks/tf.keyvaluepair.block';
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
  new TfProviderBlock('provider', null, null),
  new TfDataBlock('data',null,null),
  new TfResourceBlock('resource',null,null),
  new TfKeyValuePairBlock('keyvaluepair',null,null),
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
  }

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
