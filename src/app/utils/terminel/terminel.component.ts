import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgTerminal } from 'ng-terminal';
import { FormControl } from '@angular/forms';
import { DisplayOption } from 'ng-terminal';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Terminal } from 'xterm';
import { FunctionsUsingCSI } from 'ng-terminal';;

@Component({
  selector: 'app-term',
  templateUrl: './terminel.component.html',
  styleUrls: ['./terminel.component.css']
})
export class TerminelComponent implements OnInit, AfterViewInit {
  title = 'NgTerminal Live Example';
  color = 'accent';
  
  public resizable: boolean;
  public fixed = false;
  disabled = false;


  displayOption: DisplayOption = {};
  underlying: Terminal;

  @ViewChild('term', {static: false}) child: NgTerminal;
  
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.underlying = this.child.underlying;
    this.underlying.setOption("fontSize", 20);
    this.child.write('$ ');

    this.child.keyEventInput.subscribe(e => {
      console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        this.child.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
      } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (this.child.underlying.buffer.active.cursorX > 2) {
          this.child.write('\b \b');
        }
      } else if (printable) {
        this.child.write(e.key);
      }
    })
  }


  writeSubject = new Subject<string>();
  write() {
    
  }

  keyInput: string;
  onKeyInput(event: string) {
    this.keyInput = event;
  }

  get displayOptionForLiveUpdate() {
    return JSON.parse(JSON.stringify(this.displayOption));
  }
}
