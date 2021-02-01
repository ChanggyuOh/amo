import { BlockMutator, CustomBlock } from 'ngx-blockly';

declare var Blockly: any;

export class TfVmpProviderBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfVmpProviderBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "vmp_provider",
            "message0": "vmp_provider %1 resources&data %2",
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
        return '<block type="vmp_provider"></block>';
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