import { IEnumElement } from "./i-enum-element";
import { IRange } from "./i-range";
import { IValueConverter } from "./i-value-converter";

export interface IValueDefinition {
    type: string;
    range?: IRange;
    enumValues?: IEnumElement[];
    converter?: IValueConverter;
}