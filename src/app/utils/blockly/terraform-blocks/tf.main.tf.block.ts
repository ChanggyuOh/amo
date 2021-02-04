import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { BlockMutator, CustomBlock, Block } from 'ngx-blockly';
import { BlocklyComponent } from '../blockly.component';

declare var Blockly: any;

export class TfMainTfBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfMainTfBlock;
    }

    public defineBlock() {
        this.block.jsonInit({
            "type": "tf_main_tf",
            "message0": "main.tf %1 required_providers:required provider block(s) %2 providers:provider block(s) %3 variables:variable block(s) %4 resources:resource block(s) %5 data: data block(s) %6",
            "args0": [
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "required.providers",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "providers",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "variables:array of variable block(s)",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "resources:array of resource block(s)",
                "check": "Array"
              },
              {
                "type": "input_value",
                "name": "data:array of data block(s)",
                "check": "Array"
              }
            ],
            "output": null,
            "colour": 0,
            "tooltip": "",
            "helpUrl": ""
          });
    }

    toXML() {
        return '<block type="tf_main_tf"></block>';
    }

    toDartCode(block: CustomBlock): string | any[] {
        return 'Not implemented';
    }

    toJavaScriptCode(block: CustomBlock): string | any[] {
        var atom = Blockly.JavaScript.ORDER_ATOMIC;
        var code = "terraform { ";

        let current:any = block;
       if (current.childBlocks_.length > 0) {
           for( let i = 0 ; i < current.childBlocks_.length; i++) {
                var cBlock = current.childBlocks_[i];
                if (cBlock.blockInstance != null) {
                    switch(cBlock.blockInstance._type)
                    {
                       case "tf_required_providers":
                           break;
                       case "tf_providers":
                           break;
                       case "tf_variables":
                           break;
                       case "tf_resources":
                           break;
                       case "tf_data":
                           break;
                    }
                }
                else{ // array
                    if (cBlock.childBlocks_.length > 0) {
                        for (let j = 0; j < cBlock.childBlocks_.length; j++) {
                            var cb = cBlock.childBlocks_[j];
                            if (cb.blockInstance != null) {
                                switch(cb.blockInstance._type)
                                {
                                    case "tf_required_provider":
                                        code += this.getRequiredProvider(cb);
                                        break;
                                    case "tf_provider":
                                        code += this.getProvider(cb);
                                        break;
                                    case "tf_variable":
                                        code += this.getVariable(cb);
                                        break;
                                    case "tf_resource":
                                        code += this.getResource(cb);
                                        break;
                                    case "tf_data":
                                        code += this.getData(cb);
                                        break;
                                }
                            }
                        }
                    }
                }
           };
           var configs = current.childBlocks_[0];// array
           if (configs != null)
           {
                if (configs.childBlocks_ != null && configs.childBlocks_.length > 0)
                {
                    for (let i = 0; i < configs.childBlocks_.length; i++) {
                        var element = configs.childBlocks_[i];
                        var key = Blockly.JavaScript.valueToCode(element,'key',atom);
                        var val = Blockly.JavaScript.valueToCode(element,'value',atom);
                         code += `${key}: ${val}\n`;
                    }
                }
           }
       }
       code += '}';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
    }
    getRequiredProvider = (block:CustomBlock): string => {
        var name = this.getCode(block, 'name');
        var version = this.getCode(block, 'version');
        var source = this.getCode(block,'source');

        var code = "required_providers {";
        code += `'name': ${name}\n`;
        code += `'version': ${version}\n`;
        code += `'source': ${source}\n`;
        code += "}";
        return code;
    }
    getProvider = (block:CustomBlock): string => {
        var name = this.getCode(block, 'name');
        var code = "";
        code += `'provider': ${name} {\n`;
        let current:any = block;
        if (current.childBlocks_.length == 2) {
            var typeObjBlock = current.childBlocks_[1];
            code += this.getKeyValuePairs(typeObjBlock);
        }
        code += "}";
        return code;
    }
    getVariable = (block:CustomBlock): string => {
        var atom = Blockly.JavaScript.ORDER_ATOMIC;
        var name = this.getCode(block, 'name');
        var version = this.getCode(block, 'version');
        var source = this.getCode(block,'source');

        var code = `variable ${name} {\n`;
        let current:any = block;
        if (current.childBlocks_.length == 3) {
            var typeObjBlock = current.childBlocks_[1].childBlocks_[0];
            code += "type=object({\n";
            code += this.getKeyValuePairs(typeObjBlock);
            code += "})\n";
            var defaultValueBlock = current.childBlocks_[2].childBlocks_[0];
            code += "default = {\n";
            code += this.getKeyValuePairs(defaultValueBlock);
            code += "}\n";
        }
        code += "}";
        return code;
    }

    getKeyValuePairs = (block:any): string => { //block's _type:'tf_keyvalue_paired_obj'
        if (block.childBlocks_== null
            || block.childBlocks_.length == 0
            || block.childBlocks_[0].blockInstance._type != 'tf_keyvaluepair') return "";

        var code = "";
        var atom = Blockly.JavaScript.ORDER_ATOMIC;
        for (let i = 0; i < block.childBlocks_.length; i++) {
            var child = block.childBlocks_[i];
            var key = this.getCode(child, 'key');
            var val = this.getCode(child,'value');
            code += `${key}=${val}\n`;
        }
        return code;
    }

    getData = (block:CustomBlock): string => {
        var atom = Blockly.JavaScript.ORDER_ATOMIC;
        var value_datatype = this.getCode(block, 'datatype');
        var value_name = this.getCode(block, 'name');

        // TODO: Assemble JavaScript into code variable.
        var code = `'data' ${value_datatype} ${value_name} {\n`;
        let current:any = block;
        if (current.childBlocks_.length > 0) {
           var configs = current.childBlocks_[0];// array
           if (configs != null)
           {
                if (configs.childBlocks_ != null && configs.childBlocks_.length > 0)
                {
                    for (let i = 0; i < configs.childBlocks_.length; i++) {
                        var element = configs.childBlocks_[i];
                        var key = Blockly.JavaScript.valueToCode(element,'key',atom);
                        var val = Blockly.JavaScript.valueToCode(element,'value',atom);
                         code += `${key}: ${val}\n`;
                    }
                }
           }
       }
       code += '}';
        // TODO: Change ORDER_NONE to the correct strength.
        return code;
    }
    getResource = (block:CustomBlock): string => {
        var atom = Blockly.JavaScript.ORDER_ATOMIC;
        var value_datatype = this.getCode(block, 'resourcetype');
        var value_name = this.getCode(block, 'name');
        
        var code = `'resource' ${value_datatype} ${value_name} {\n`;
        var current:any = block;
       if (current.childBlocks_.length > 0) {
           var configs = current.childBlocks_[0];// array
           if (configs != null)
           {
                if (configs.childBlocks_ != null && configs.childBlocks_.length > 0)
                {
                    for (let i = 0; i < configs.childBlocks_.length; i++) {
                        var element = configs.childBlocks_[i];
                        var key = Blockly.JavaScript.valueToCode(element,'key',atom);
                        var val = Blockly.JavaScript.valueToCode(element,'value',atom);
                         code += `${key}: ${val}\n`;
                    }
                }
           }
       }
       code += '}';
        // TODO: Change ORDER_NONE to the correct strength.
        return code;
    }
    getCode = (block:CustomBlock, name:string):string => {
        return Blockly.JavaScript.valueToCode(block, name , Blockly.JavaScript.ORDER_ATOMIC);
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