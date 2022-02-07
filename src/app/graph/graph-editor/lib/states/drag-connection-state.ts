import { CompositeCommand } from "../commands/composite-command";
import { CreateConnectionCommand } from "../commands/create-connection-command";
import { RemoveConnectionCommand } from "../commands/remove-connection-command";
import { ConnectionView } from "../views/connection-view";
import { Point } from "../geometry/point";
import { IEditor } from "../models/i-editor";
import { IEvent } from "../models/i-event";
import { NodePropertyView } from "../views/node-property-view";
import { findConnector, State } from "./state";
import { IdleState } from "./idle-state";
import { PendingConnectionFeedback } from "./pending-connection-feedback";

export class DragConnectionState extends State {
    feedback: PendingConnectionFeedback;
    previousConnection: ConnectionView = null;

    constructor (editor: IEditor, private fromProperty: NodePropertyView, startPoint: Point) {
        super();
        if (fromProperty.isConnected()) {
            this.previousConnection = fromProperty.connections[0];
            this.previousConnection.connection.disconnect();
            this.fromProperty = this.previousConnection.opposite(fromProperty);
        }
        this.feedback = new PendingConnectionFeedback(this.fromProperty, startPoint)
        editor.addFeedback(this.feedback);
        editor.draw();
    }

    handleMouseMove(editor: IEditor, event: IEvent): State {
        const toProperty = findConnector(editor.nodeViews, event.position, editor.renderer.style);
        this.feedback.update(toProperty, event.position);
        editor.draw();
        return this;
    }

    handleMouseUp(editor: IEditor, event: IEvent): State {
        editor.removeFeedback(this.feedback);
        const toProperty = findConnector(editor.nodeViews, event.position, editor.renderer.style);
        const createCommand = toProperty != null && editor.canConnect(this.fromProperty.property, toProperty.property)
                ? new CreateConnectionCommand(this.fromProperty.property, toProperty.property) : null;
        if (this.previousConnection == null) {
            if (createCommand != null) {
                editor.emit(createCommand);
            } else {
                editor.draw();
            }
        } else {
            const disconnectCommand = new RemoveConnectionCommand(this.previousConnection.connection);
            if (createCommand == null) {
                editor.emit(disconnectCommand);
            } else if (toProperty.property.isRelatedTo(this.previousConnection.connection.opposite(this.fromProperty.property))) {
                // no action actually
                this.previousConnection.connection.connect();
                editor.draw();
            } else {
                editor.emit(new CompositeCommand([ disconnectCommand, createCommand ]));
            }
        }
        return new IdleState();
    }

    handleMouseDown(editor: IEditor, event: IEvent): State {
        // should not happen, in case return to Idle
        return new IdleState();
    }

}
