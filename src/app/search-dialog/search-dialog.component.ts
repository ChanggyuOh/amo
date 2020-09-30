import { Component, OnInit } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
  options = {
    theme: 'vs-dark'
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
  }

}
