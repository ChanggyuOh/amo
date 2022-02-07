import { PropertyType } from "../enums/property-type.enum";
import { IValueDefinition } from "../value/i-value-definition";

export interface IPropertyDefinition {
    type: PropertyType;
    id: string;
    label: string;
    linkable?: boolean;
    editable?: boolean;
    valueType: IValueDefinition;
    defaultValue?: any;
}