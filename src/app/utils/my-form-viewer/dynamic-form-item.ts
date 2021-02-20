import { Type } from '@angular/core';

export class DynamicFormItem {
  constructor(public component: Type<any>, public data: any) {}
}
