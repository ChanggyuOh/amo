import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-my-editor',
  templateUrl: './my-editor.component.html',
  styleUrls: ['./my-editor.component.css']
})
export class MyEditorComponent implements OnInit {
  @ViewChild("editor") editor: any;
  monaco: any;
  languages: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  options = {
    theme: 'vs-dark',
    automaticLayout: true
  };
  
  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');
 
  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json',
    //uri: (<any>window).monaco.Uri.parse('a://b/foo.json')
  };
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
  public onInitEditor = ($event:any) => {
    console.log("onInitEditor");
    this.monaco = (<any>window).monaco;
    this.languages = this.monaco.languages
                                .getLanguages()
                                .map(function(lang) { return lang.id; });
    this.languages.sort();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
       startWith(''),
       map(value => this._filter(value))
     );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.languages
               .filter(option => option.toLowerCase().includes(filterValue));
  }

  public getLanguage = (language:string) => {
    console.log("selected language:" + language);
    
    this.monaco.editor.setModelLanguage(this.monaco.editor.getModels()[0],language);
  }
}
