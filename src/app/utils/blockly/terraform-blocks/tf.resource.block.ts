import { BlockMutator, CustomBlock } from 'ngx-blockly';

declare var Blockly: any;

export class TfResourceBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfResourceBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_resource",
            "message0": "resouce %1 resource type %2 name %3 configs:array of key value pair block(s) %4",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "resourcetype",
                "check": "String"
              },
              {
                "type": "input_value",
                "name": "name",
                "check": "String"
              },
              {
                "type": "input_value",
                "name": "configs",
                "check": "Array"
              }
            ],
            "output": null,
            "colour": 225,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_resource"></block>';
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
        //console.log(changeEvent);
    }
}