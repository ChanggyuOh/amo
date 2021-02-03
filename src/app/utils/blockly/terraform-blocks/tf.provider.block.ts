import { BlockMutator, CustomBlock, Block } from 'ngx-blockly';
import { BlocklyComponent } from '../blockly.component';

declare var Blockly: any;

export class TfProviderBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfProviderBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_provider",
            "message0": "provider %1 name:string %2 configs: array of key value pairs %3",
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
                "name": "keyvaluepairs:array of keyvaluepair block(s)",
                "check": "Array"
              }
            ],
            "output": null,
            "colour": 90,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_provider"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
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