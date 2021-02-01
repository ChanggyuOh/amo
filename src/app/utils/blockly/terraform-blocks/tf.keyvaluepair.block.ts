import { BlockMutator, CustomBlock } from 'ngx-blockly';

declare var Blockly: any;

export class TfKeyValuePairBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfKeyValuePairBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "keyvaluepair",
            "message0": "key value pair %1 key %2 value %3",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "key",
                "check": "String"
              },
              {
                "type": "input_value",
                "name": "value"
              }
            ],
            "inputsInline": false,
            "output": null,
            "colour": 90,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="keyvaluepair"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toLuaCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toPHPCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toPythonCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }


    onChange(changeEvent: any) {
        console.log(changeEvent);
    }
}