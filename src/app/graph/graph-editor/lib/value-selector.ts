import { CommonValueType } from "./value/common-value-type.enum";
import { Point } from "./geometry/point";
import { IRange } from "./value/i-range";
import { IValueDefinition } from "./value/i-value-definition";
import { Selector } from "./selector";

export class ValueSelector extends Selector {
    private inputElement: HTMLInputElement;
    private valueType: IValueDefinition;
    private value: any;
    private resolve: (value: any) => void;
    private reject: () => void;

    constructor() {
        super();
        this.inputElement = document.createElement("input");
        this.inputElement.classList.add("value-selector");
        this.inputElement.addEventListener("keyup", e => this.keyUp(e));
        this.selectorEl.appendChild(this.inputElement);
    }

    protected internalOpen(position: Point, ctxt: any): Promise<any> {
        const { value: _value, valueType: _valueType } = ctxt;
        this.value = _value;
        this.valueType = _valueType;
        this.inputElement.value = this.value;
        setTimeout(() => {
            this.inputElement.focus();
            this.inputElement.select();
        }, 0);
        return new Promise<any>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    close() {
        super.close();
        this.reject();
    }

    private keyUp(e) {
        this.value = this.inputElement.value;
        const error = this.checkError();
        if (error) {
            this.inputElement.classList.add("error");
        } else {
            this.inputElement.classList.remove("error");
        }
        if (e.key == "Escape") {
            this.close();
        } else  if (e.key == "Enter") {
            super.close();
            if (error) {
                this.reject();
            } else {
                this.resolve(this.convert(this.value));
            }
        }
    }

    // TODO move all of that in some way to ValueDefinition
    private convert(value: any) {
        if (this.valueType.type == CommonValueType.INTEGER || this.valueType.type == CommonValueType.REAL) {
            return Number(value);
        }
        return value;
    }

    private checkError() {
        if (this.valueType.type == CommonValueType.INTEGER) {
            return this.checkInt(this.value) || this.valueType.range && this.checkRange(this.valueType.range, this.value);
        }
        if (this.valueType.type == CommonValueType.REAL) {
            return isNaN(Number(this.value)) || this.valueType.range && this.checkRange(this.valueType.range, this.value);
        }
        return false;
    }

    private checkInt(value: any) {
        const v = Number(value);
        return isNaN(v) || v != Math.floor(v);
    }

    private checkRange(range: IRange, value: any) {
        return range.min != undefined && value < range.min
                || range.max != undefined && value > range.max;
    }

}