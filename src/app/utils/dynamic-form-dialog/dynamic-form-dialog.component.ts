import { Component, OnInit, Inject, ViewChild, EventEmitter, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/app/shared/repository.service';
import { FormDefinition } from '../../_interface/form-definition.model';
import { Validators } from '@angular/forms';
import { FieldConfig, Validator } from '../my-form-builder/components/field.interface';
import { DynamicFormComponent } from '../my-form-builder/components/dynamic-form/dynamic-form.component';
import { DynamicFormItem } from '../my-form-viewer/dynamic-form-item';
import { AnchorDirective } from '../my-form-viewer/anchor.directive';

@Component({
  selector: 'app-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html',
  styleUrls: ['./dynamic-form-dialog.component.css']
})
export class DynamicFormDialogComponent implements OnInit {
  @ViewChild(AnchorDirective, {static:true}) dynamicFormAnchor: AnchorDirective;
  @Input() currentDynamicForm: DynamicFormItem;
  public pageSize:number = 20;
  public form: Object;
  public formDefinition: FormDefinition;
  
  constructor(
    public dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formId: number,
    private repoService: RepositoryService,
    public viewContainerRef: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver) {
      this.loadComponent();
    }

  ngOnInit(): void {
  }

  loadComponent = () => {
    this.getForm(this.formId)
    .subscribe((res:FormDefinition) =>{
      this.formDefinition = res;
      let currentForm = JSON.parse(res.definition);
      
    for(var key in currentForm){
      if (currentForm.hasOwnProperty(key))
        if (Array.isArray(currentForm[key])){ // components
          var form = this.buildForm(currentForm[key]);
          this.currentDynamicForm = new DynamicFormItem(DynamicFormComponent, form);
          const componentFactory = this.cfResolver.resolveComponentFactory(this.currentDynamicForm.component);
          const viewContainerRef = this.dynamicFormAnchor.viewContainerRef;
          viewContainerRef.clear();
      
          const componentRef = viewContainerRef.createComponent<DynamicFormComponent>(componentFactory);
          componentRef.instance.fields = form;
          //binding submitted data from dynamic form to this dialog event handler
          componentRef.instance.submit.subscribe(msg => this.submit(msg));
        }
    }
    });
    
  }

  private getForm = (formId: number): Observable<Object> => {
    return this.repoService.getData(`forms/${formId}`, null);
  }

  buildForm = (obj:any):FieldConfig[] => {
    console.log("elm:"+obj);
    var arry =[];
    if (Array.isArray(obj)){
      obj.forEach(item => {
        let elm = item as FieldConfig;
        console.log("elm:"+elm);
        if (elm.validations){
          var validators = [];
          elm.validations.forEach(element => {
            let vali = element as Validator;
            validators.push({
              name: vali.name,
              validator: this.getValidator(vali.validator),
              message: vali.message
            });
          });
          arry.push({
            label: elm.label,
            name: elm.name,
            inputType: elm.inputType,
            type: elm.type,
            options: elm.options ?elm.options : null,
            collections: elm.collections ? elm.collections : null,
            validations: validators
          });
        }
        else {
          arry.push({
            label: elm.label,
            name: elm.name,
            inputType: elm.inputType,
            type: elm.type,
            options: elm.options ?elm.options : null,
            collections: elm.collections ? elm.collections : null
          });
        }
      });
    }
    return arry;
  }

  submit = (val: any):void => {
    var json = JSON.stringify(val);
    console.log("submit clicked:"+json);
    this.dialogRef.close(val);
  }

  getValidator = (valr: string): any =>{
    if (valr == "Validators.required")
      return Validators.required;
    if (valr.startsWith("Validators.pattern(")){
      console.log('valr:'+valr);
      var pattern =`${valr.substring(valr.indexOf("('")+2, valr.indexOf("')"))}`;
      console.log(pattern);
      return Validators.pattern(pattern);
    }
  }

  public onNoClick = (): void => {
    this.dialogRef.close();
  }
}
