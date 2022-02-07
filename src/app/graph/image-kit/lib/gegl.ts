import { ChangePropertyValueCommand } from "../../graph-editor/lib/commands/change-property-value-command";
import { Point } from "../../graph-editor/lib/geometry/point";
import { GraphNode } from "../../graph-editor/lib/graph-node";
import { getDefaultPropertyHandler } from "../../graph-editor/lib/handlers/get-default-property-handler";
import { rgb } from "../../graph-editor/lib/models/i-color-theme";
import { GraphNodeProperty } from "../../graph-editor/lib/graph-node-property";
import { PropertyType } from "../../graph-editor/lib/enums/property-type.enum";
import { Renderer } from "../../graph-editor/lib/renderer";
import { State } from "../../graph-editor/lib/states/state";
import { CommonValueType } from "../../graph-editor/lib/value/common-value-type.enum";
import { IValueDefinition } from "../../graph-editor/lib/value/i-value-definition";
import { NodePropertyView } from "../../graph-editor/lib/views/node-property-view";
import { convertColorFromString, convertColorToString } from "./color-selector";
import { gegl } from "./gegl-nodes-db";
import { IPropertyDefinition } from "../../graph-editor/lib/models/i-property-definition";
import { INodeDefinition } from "../../graph-editor/lib/models/i-node-definition";
import { IPropertyHandler } from "../../graph-editor/lib/models/i-property-handler";
import { IEditor } from "../../graph-editor/lib/models/i-editor";
import { IEvent } from "../../graph-editor/lib/models/i-event";
import { IGraphicalHelper } from "../../graph-editor/lib/models/i-graphical-helper";
import { IColor } from "../../graph-editor/lib/models/i-color";

enum GeglValueType {
    COLOR = "color",
    IMAGE = "image",
}

const BOOL_DEF: IValueDefinition = { type: CommonValueType.BOOLEAN };
const REAL_DEF: IValueDefinition = { type: CommonValueType.REAL };
const INTEGER_DEF: IValueDefinition = { type: CommonValueType.INTEGER };
const STRING_DEF: IValueDefinition = { type: CommonValueType.STRING };
const IMAGE_DEF: IValueDefinition = { type: GeglValueType.IMAGE };
const COLOR_DEF: IValueDefinition = {
    type: GeglValueType.COLOR,
    converter: {
        deserialize: value => convertColorFromString(value),
        serialize: value => convertColorToString(value)
    }
};

function normalizeLabel(title: string, name: string) {
    if (title) {
        return title;
    }
    // TODO remove prefix before ':' split words on '-' and capitalize
    return name;
}

function buildPorts(ports, type: PropertyType): IPropertyDefinition[] {
    const groups = {};
    ports.forEach(p => {
        const result = p.match(/^([^-]*)-[0-9]+$/);
        if (result) {
            let count = groups[result[1]] || 0
            groups[result[1]] = count + 1;
        } else {
            groups[p] = 1;
        }
    });
    function multipleType(t: PropertyType) {
        return t == PropertyType.INPUT ? PropertyType.NEW_INPUT : PropertyType.NEW_OUTPUT;
    }
    return Object.keys(groups).map(port => {
        return {
            type: groups[port] > 1 ? multipleType(type) : type,
            id: port,
            label: port,
            linkable: true,
            editable: false,
            valueType: IMAGE_DEF
        };
    });
}

function buildType(property): IValueDefinition {
    if (property.type == 'number') {
        if (property.range) {
            return {...REAL_DEF, range: { min: property.range.min, max: property.range.max }};
        }
        return REAL_DEF;
    }
    if (property.type == 'int') {
        if (property.range) {
            return {...INTEGER_DEF, range: { min: property.range.min, max: property.range.max }};
        }
        return INTEGER_DEF;
    }
    if (property.type == 'boolean') {
        return BOOL_DEF;
    }
    if (property.type == 'string') {
        return STRING_DEF;
    }
    if (property.type == 'enum') {
        return {
            type: CommonValueType.ENUM,
            enumValues: property.elements.map(element => {
                return { name: element.value, label: element.label };
            })
        }
    }
    if (property.type == 'color') {
        return COLOR_DEF;
    }
    return IMAGE_DEF;
}

function convertValue(valueType: IValueDefinition, value: any): any {
    if (value && valueType.converter) {
        return valueType.converter.deserialize(value);
    }
    return value;
}

function buildProperties(properties): IPropertyDefinition[] {
    return properties.map(property => {
        const type = buildType(property);
        return {
            type: PropertyType.INPUT,
            id: property.id,
            label: normalizeLabel(property.nick, property.id),
            linkable: false,
            editable: true,
            valueType: type,
            defaultValue: convertValue(type, property.def)
        };
    });
}

function buildPreview(operation) {
    if (operation.name === "gegl:png-load"
            || operation.name === "gegl:png-save") {
        return true;
    }
    return undefined;
} 

function buildDefinitions(): INodeDefinition[] {
    return gegl.map(operation => {
        return ({
            id: operation.name,
            label: normalizeLabel(operation.title, operation.name),
            categories: operation.categories,
            properties: buildPorts(operation.inputs, PropertyType.INPUT)
                .concat(buildPorts(operation.outputs, PropertyType.OUTPUT))
                .concat(buildProperties(operation.properties)),
            preview: buildPreview(operation)
        });
    }).concat({
        id: "ratatest",
        label: "Rata Test",
        categories: "test",
        properties: [{
            type: PropertyType.NEW_OUTPUT,
            id: "output",
            label: "Output",
            linkable: true,
            editable: true,
            valueType: { type: CommonValueType.LABEL }
        }],
        preview: false
    });
}

const colorPropertyHandler: IPropertyHandler = {
    handlerMouseDown(editor: IEditor, event: IEvent, property: NodePropertyView): State {
        const selectorResult = editor.openSelector(property.globalBounds().bottomLeft(), 'select-color', {
            value: property.property.value,
        });
        selectorResult.result.then((value) => {
            editor.emit(new ChangePropertyValueCommand(property.property, value));
        }, () => {});
        return selectorResult.state;
    },

    layout(renderer: Renderer, property: NodePropertyView) {
        const m = renderer.context.measureText(property.property.definition.label);
        property.bounds = new Point(0, 0).rect(m.width + renderer.style.unit * (3.5 + 2*2 + 4), renderer.style.unit * 4);
    },

    draw(renderer: Renderer, property: NodePropertyView) {
        const propBounds = property.globalBounds();
        const style = renderer.style;
        renderer.drawText(propBounds.origin.offset(style.unit * 3.5, style.unit * 3),
            rgb(renderer.theme.TEXT_COLOR), property.property.definition.label);
        const colorRect = propBounds.topRight().offset(style.unit * -6, 0).rect(style.unit * 4, style.unit * 4);
        renderer.roundBox()
            .filled(rgb(property.property.value))
            .draw(colorRect);
    }
}

export const geglNodeDefinitions = buildDefinitions();

export class GeglGraphicalHelper implements IGraphicalHelper {

    getHeaderColor(node: GraphNode): IColor {
        if (node.definition.categories && node.definition.categories.startsWith("programming:")) {
            return { r: 0xfc, g: 0x83, b: 0x47 }; // orange
        }
        if (node.definition.categories
                && (node.definition.categories === "hidden"
                    || node.definition.categories === "output")) {
            return {r: 0xaa, g: 0x26, b: 0x31 }; // dark red 
            // return { r: 0xcc, g: 0x29, b: 0x3e }; // red
        }
        if (node.definition.id == "gegl:add") {
            return {r: 0x75, g: 0x57, b: 0xb6 }; // purple
        }
        return { r: 0x00, g: 0xa9, b: 0x6a }; // green
    }
    
    getConnectorColor(property: GraphNodeProperty): IColor {
        const valueDef = property.definition.valueType;
        if (valueDef.type == GeglValueType.IMAGE) {
            return { r: 0xc7, g: 0xc7, b: 0x29 };
        }
        // if (valueDef.type == GeglValueType.UV) {
        //     return { r: 0x63, g: 0x63, b: 0xc7 };
        // }
        // if (valueDef.type == GeglValueType.SHADER) {
        //     return { r: 0x63, g: 0xc7, b: 0x63 };
        // }
        if (valueDef.type == CommonValueType.LABEL) {
            return { r: 0x63, g: 0xc7, b: 0x63 };
        }
        return { r: 0xa1, g: 0xa1, b: 0xa1 };
    }

    getPropertyHandler(property: GraphNodeProperty) {
        if (property.definition.valueType.type == GeglValueType.COLOR) {
            return colorPropertyHandler;
        }
        return getDefaultPropertyHandler(property);
    }
}