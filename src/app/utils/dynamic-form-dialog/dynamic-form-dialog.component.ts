import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RepositoryService } from 'src/app/shared/repository.service';
import { FormDefinition } from '../../_interface/form-definition.model';

@Component({
  selector: 'app-dynamic-form-dialog',
  templateUrl: './dynamic-form-dialog.component.html',
  styleUrls: ['./dynamic-form-dialog.component.css']
})
export class DynamicFormDialogComponent implements OnInit {
  public form: Object;
  public viewData: FormDefinition;

  constructor(
    public dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formId: number,
    private repoService: RepositoryService) {
      var data = this.getForm(this.formId);
      data.subscribe((res:FormDefinition) =>{
        this.viewData = res;
      console.log(this.viewData.definition);
      this.form = JSON.parse(this.viewData.definition);
    });
    }

  ngOnInit(): void {
  }

  private getForm = (formId: number): Observable<Object> => {
    return this.repoService.getData(`forms/${formId}`, null);
  }

  public onSubmit = (event: any): void => {
    console.log(event.data);
  }

  public onNoClick = (): void => {
    this.dialogRef.close();
  }
}
