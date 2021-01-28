import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray } from '@angular/forms';

@Component({
  selector: 'app-my-dynamic-form',
  templateUrl: './my-dynamic-form.component.html',
  styleUrls: ['./my-dynamic-form.component.css']
})
export class MyDynamicFormComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  ngOnInit(){
    
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
