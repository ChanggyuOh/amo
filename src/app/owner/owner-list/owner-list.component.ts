import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../../_interface/owner.model';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public displayedColumns = ['id','firstName','lastName','userName','joinedDate', 'age','details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<Owner>();
  constructor(private repoService: RepositoryService) { }
  ngOnInit() {
    this.getAllOwners();
  }
  public getAllOwners = () => {
    this.repoService.getData('users/1/20')
    .subscribe(res => {
      this.dataSource.data = res as Owner[];
    })
  }
  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    
  }
}
