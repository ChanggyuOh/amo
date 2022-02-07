import { IPropertyHandler } from "../models/i-property-handler";
import { GraphNodeProperty } from "../graph-node-property";
import { CommonValueType } from "../value/common-value-type.enum";
import { booleanHandler } from "./boolean-handler";
import { defaultPropertyHandler } from "./default-property-handler";
import { enumHandler } from "./enum-handler";
import { labelHandler } from "./label-handler";
import { numberHandler } from "./number-handler";
import { stringHandler } from "./string-handler";

export function getDefaultPropertyHandler(property: GraphNodeProperty): IPropertyHandler {
    if (property.definition.valueType.type == CommonValueType.INTEGER || property.definition.valueType.type == CommonValueType.REAL) {
        return numberHandler;
    }
    if (property.definition.valueType.type == CommonValueType.STRING) {
        return stringHandler;
    }
    if (property.definition.valueType.type == CommonValueType.ENUM) {
        return enumHandler;
    }
    if (property.definition.valueType.type == CommonValueType.BOOLEAN) {
        return booleanHandler;
    }
    if (property.definition.valueType.type == CommonValueType.LABEL) {
        return labelHandler;
    }
    return defaultPropertyHandler;
}