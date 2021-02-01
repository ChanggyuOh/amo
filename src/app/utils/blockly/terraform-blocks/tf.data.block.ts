import { BlockMutator, CustomBlock } from 'ngx-blockly';

declare var Blockly: any;

export class TfDataBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfDataBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "data",
            "message0": "data %1 %2",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "keyvalue",
                "check": "Array"
              }
            ],
            "inputsInline": false,
            "output": "Array",
            "colour": 330,
            "tooltip": "Terraform Data",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="data"></block>';
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