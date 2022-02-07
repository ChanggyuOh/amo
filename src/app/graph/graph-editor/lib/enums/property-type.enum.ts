export enum PropertyType {
    INPUT = "INPUT",
    OUTPUT = "OUTPUT",
    NEW_INPUT = "NEW_INPUT",
    NEW_OUTPUT = "NEW_OUTPUT"
}

export function isOutput(type: PropertyType) {
    return type == PropertyType.OUTPUT || type == PropertyType.NEW_OUTPUT;
}

export function isNewPort(type: PropertyType) {
    return type == PropertyType.NEW_INPUT || type == PropertyType.NEW_OUTPUT;
}