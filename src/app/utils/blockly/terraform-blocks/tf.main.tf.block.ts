import { BlockMutator, CustomBlock, Block } from 'ngx-blockly';
import { BlocklyComponent } from '../blockly.component';

declare var Blockly: any;

export class TfMainTfBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfMainTfBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_main_tf",
            "message0": "main.tf %1 required_providers:required provider block(s) %2 providers:provider block(s) %3 variables:variable block(s) %4 resources:resource block(s) %5 data: data block(s) %6",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "required.providers",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "providers",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "variables:array of variable block(s)",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "resources:array of resource block(s)",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "data:array of data block(s)",
                "check": "Array"
              }
            ],
            "output": null,
            "colour": 0,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_main_tf"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
        return "";
    }



    toLuaCode(block: CustomBlock): string | any[] {
        var b: Block = block;
        return 'Not implemented';
    }

    toPHPCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toPythonCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    onChange(changeEvent: any) {
        //console.log(changeEvent);
    }
}