import { BlockMutator, CustomBlock } from 'ngx-blockly';

declare var Blockly: any;

export class TfKeyValuePairedObjBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfKeyValuePairedObjBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_keyvalue_paired_obj",
            "message0": "key value paired object %1 key value pairs %2",
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
            "output": null,
            "colour": 180,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_keyvalue_paired_obj"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
       // console.log("key:"+key + " value:"+val);
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