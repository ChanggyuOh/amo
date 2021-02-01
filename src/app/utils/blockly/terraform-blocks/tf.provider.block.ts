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
            "type": "provider",
            "message0": "provider %1 resources&data %2",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "NAME",
                "check": "Array"
              }
            ],
            "inputsInline": false,
            "colour": 255,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="provider"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
        var b:Block = block;
        
        let me = "{ 'type': 'PROVIDER' }";
        return me;
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