import { Injectable } from '@angular/core';
import { FileElement } from '../_interface/file-element.model';
import { v4 } from 'uuid';
import { BehaviorSubject, Observable, from } from 'rxjs'
export interface IFileService {
  add(fileElement: FileElement)
  delete(id: string)
  update(id: string, update: Partial<FileElement>)
  queryInFolder(folderId: string): Observable<FileElement[]>
  get(id: string): FileElement
}

@Injectable({
  providedIn: 'root'
})
export class FileService implements IFileService {
  private map = new Map<string, FileElement>()
  constructor() { }
  add(fileElement: FileElement) {
    fileElement.id = v4()
    this.map.set(fileElement.id, this.clone(fileElement))
    return fileElement
  }

  delete(id: string) {
    this.map.delete(id)
  }

  update(id: string, update: Partial<FileElement>) {
    let element = this.map.get(id)
    element = Object.assign(element, update)
    this.map.set(element.id, element)
  }

  private querySubject: BehaviorSubject<FileElement[]>
  queryInFolder(folderId: string) {
    const result: FileElement[] = []
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element))
      }
    })
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result)
    } else {
      this.querySubject.next(result)
    }
    return this.querySubject.asObservable()
  }

  get(id: string) {
    return this.map.get(id)
  }

  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element))
  }
}
