import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../../_interface/owner.model';
import { SocialUser, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public displayedColumns = ['id','firstName','lastName','userName','joinedDate', 'age','details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<Owner>();
  user: SocialUser;
  loggedIn: boolean;
  
  constructor(private repoService: RepositoryService,
              private authService: SocialAuthService) { }

  ngOnInit() {
    var user = localStorage.getItem('user');
    if (user != null)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loggedIn = true;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    this.getAllOwners();
  }
  public getAllOwners = () => {
    this.repoService.getData('users/1/20', this.user)
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
