import { BlockMutator, CustomBlock } from 'ngx-blockly';
import { config } from 'rxjs';
import { BlocklyComponent } from '../blockly.component';

declare var Blockly: any;

export class TfDataBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfDataBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_data",
            "message0": "data %1 data type %2 name %3 configs:array of key value pair block(s) %4",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "datatype",
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
            "colour": 270,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_data"></block>';
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