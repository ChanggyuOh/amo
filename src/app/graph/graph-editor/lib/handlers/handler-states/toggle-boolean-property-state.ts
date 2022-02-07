import { ChangePropertyValueCommand } from "../../commands/change-property-value-command";
import { IEditor } from "../../models/i-editor";
import { IEvent } from "../../models/i-event";
import { State } from "../../states/state";
import { IdleState } from "../../states/idle-state";
import { NodePropertyView } from "../../views/node-property-view";

export class ToggleBooleanPropertyState extends State {
    constructor(private property: NodePropertyView) {
        super();
    }
    handleMouseUp(editor: IEditor,  event: IEvent): State {
        editor.emit(new ChangePropertyValueCommand(this.property.property, !this.property.property.value));
        return new IdleState();
    }
}