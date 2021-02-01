import { BlockMutator, CustomBlock } from 'ngx-blockly';

declare var Blockly: any;

export class TfResourceBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfResourceBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "resource",
            "message0": "resource %1 list of config %2",
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
            "output": null,
            "colour": 210,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="resource"></block>';
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