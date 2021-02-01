import { BlockMutator, CustomBlock, Block } from 'ngx-blockly';

declare var Blockly: any;

export class TfListCreateWithEmptyBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = TfListCreateWithEmptyBlock;
    }

    public defineBlock() {
        this.block.mutationToDom = this.mutationDoDom;
        this.block.domToMutation = this.domToMutation;
        this.block.decompose = this.decompose;
        this.block.compose = this.compose;
        this.block.saveConnections = this.saveConnections;
        this.block.updateShape = this.updateShape;
        this.block.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
        this.block.setStyle('list_blocks');
        this.block.itemCount_ = 3;
        this.block.updateShape();
        this.block.setOutput(true, 'Array');
        this.block.setMutator(new Blockly.Mutator(['lists_create_with_item']));
        this.block.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
    }
    mutationDoDom = () =>{
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.block.itemCount_);
        return container;
    }
    domToMutation = (xmlElement:any) =>{
        this.block.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.block.updateShape();
    }
    decompose = (workspace: any): Block =>{
        var containerBlock = workspace.newBlock('lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.block.itemCount_; i++) {
            var itemBlock = workspace.newBlock('lists_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    }
    compose = (containerBlock: any): any =>{
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
        connections.push(itemBlock.valueConnection_);
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.block.itemCount_; i++) {
        var connection = this.block.getInput('ADD' + i).connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
            connection.disconnect();
        }
        }
        this.block.itemCount_ = connections.length;
        this.block.updateShape();
        // Reconnect any child blocks.
        for (var i = 0; i < this.block.itemCount_; i++) {
        Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    }
    saveConnections = (containerBlock:any) =>{
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
        var input = this.block.getInput('ADD' + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
        }
    }
    updateShape = () =>{
        if (this.block.itemCount_ && this.block.getInput('EMPTY')) {
            this.block.removeInput('EMPTY');
          } else if (!this.block.itemCount_ && !this.block.getInput('EMPTY')) {
            this.block.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
          }
          // Add new inputs.
          for (var i = 0; i < this.block.itemCount_; i++) {
            if (!this.block.getInput('ADD' + i)) {
              var input = this.block.appendValueInput('ADD' + i)
                  .setAlign(Blockly.ALIGN_RIGHT);
              if (i == 0) {
                input.appendField(Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH']);
              }
            }
          }
          // Remove deleted inputs.
          while (this.block.getInput('ADD' + i)) {
            this.block.removeInput('ADD' + i);
            i++;
          }
    }
    toXML() {
        return '<block type="lists_repeat"></block>';
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