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
    var monaco = (<any>window).monaco;
    var modesIds = monaco.languages.getLanguages().map(function(lang) { return lang.id; });
    modesIds.sort();
      
    monaco.languages.register({id: 'topic-search'});
    monaco.languages.setMonachTokensProvider('topic-search',{
      tokenizer:{
        root:[
        [/select|from|where|order by|group by|having/, 'element'],
        [/:.*/,'normal-text']
        ]
      }
    });
    // register a hover provider
    monaco.languages.registerHoverProvider('topic-search',{
      provideHover(document, position, token){
        let currentTextLine = document.getLineContent(position.lineNumber);
        let firstWordPart = currentTextLine.match(/(?:"[^"]*"|^[^"]*$)/);

        let hoveredWord = "";
        if(firstWordPart)
          hoveredWord = firstWordPart[0].replace(/"/g,"");
        
        //...
      }
    });

    // Define a new theme
    monaco.editor.defineTheme('topic-search-theme',{
      base: 'vs',
      inherit: false,
      rules:[
        { token: 'normal-text', foreground: '400000'},
        { token: 'element', foreground: '0000A0', fontStyle: 'bold'},
      ]
    });

    monaco.languages.setLanguageConfiguration('topic-search',{
      indentationRules: {
        // ^(.*\*/)?\s*\}.*$
       // decreaseIndentPattern: /^(.*\*/)?\s*\}.*$/,

      }
    });
  }

}
