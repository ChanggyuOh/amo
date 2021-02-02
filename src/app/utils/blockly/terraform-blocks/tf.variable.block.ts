import { BlockMutator, CustomBlock, Block } from 'ngx-blockly';
import { BlocklyComponent } from '../blockly.component';

declare var Blockly: any;

export class TfVariableBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfVariableBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_variable",
            "message0": "variable %1 name:string %2 type:object %3 value:object %4",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "name",
                "check": "String"
              },
              {
                "type": "input_value",
                "name": "variabletype",
                "check": "variabletype"
              },
              {
                "type": "input_value",
                "name": "defaultvalues",
                "check": "defaultvalues"
              }
            ],
            "output": null,
            "colour": 135,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_variable"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
        console.log(block);
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