export interface IValueConverter {
    serialize(value: any): any;
    deserialize(value: any): any;
}
