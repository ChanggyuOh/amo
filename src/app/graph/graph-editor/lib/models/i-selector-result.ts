import { State } from "../states/state";

export interface ISelectorResult {
    state: State;
    result: Promise<any>;
}