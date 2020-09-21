import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from '../../_interface/file-element.model';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component'
import { RenameDialogComponent} from './modals/rename-dialog/rename-dialog.component'
/*
All of these @Outputs need to be easily accessible in our component-template, as well.

To get that, we will implement tiny functions to emit a new event for each @Output. These functions are all placed inside of the FileExplorerComponent.
 */
@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }
  
  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }
  /**
   * Because of the way how angular menus work, 
   * we also have to place the menus in the template itself. 
   * These menus are not visible until they are opened by our component-logic. 
   * Learn more about angular material menus!
   * 
   * These menus are opened by the openMenu method in our fileExplorerComponent
   * @param event 
   * @param viewChild 
   */
  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}
