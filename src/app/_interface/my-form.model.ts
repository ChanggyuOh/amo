import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicFormGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicFormArrayModel
} from "@ng-dynamic-forms/core";

export const MY_FORM_MODEL: DynamicFormModel = [
    new DynamicFormGroupModel({

        id: "fullName",
        legend: "Name",
        group: [
            new DynamicInputModel({
                
                id: "firstName",
                label: "First Name"
            }),
            new DynamicInputModel({
                
                id: "lastName",
                label: "Last Name"
            })
        ]
    }),
    
    new DynamicFormGroupModel({
 
        id: "address",
        legend: "Address",
        group: [
            new DynamicInputModel({
                    
                id: "street",
                label: "street"
            }),
            new DynamicInputModel({
                
                id: "zipCode",
                label: "Zip Code"
            })
        ]
    })
];


export const MY_FORM2_MODEL: DynamicFormModel = [
    new DynamicFormArrayModel({

        id: "myFormArray",
        initialCount: 5,
        groupFactory: () => {
            return [
                new DynamicInputModel({
                    id: "myInput",
                    label: "My Input"
                })
            ];
        }
    })
];