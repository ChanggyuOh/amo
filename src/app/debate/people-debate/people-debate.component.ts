import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RepositoryService } from '../../shared/repository.service';
import { PeopleDebateItem } from '../../_interface/people-debate.model';
import { PeopleDebateListComponent } from '../people-debate-list/people-debate-list.component';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDialogComponent } from '../candidate-dialog/candidate-dialog.component';
import { DynamicFormDialogComponent} from '../../utils/dynamic-form-dialog/dynamic-form-dialog.component';
@Component({
  selector: 'app-people-debate',
  templateUrl: './people-debate.component.html',
  styleUrls: ['./people-debate.component.css']
})
export class PeopleDebateComponent implements OnInit {
  sub: any;
  public id: number;
  public peopleDebateItem: PeopleDebateItem;
  user: SocialUser;
  loggedIn: boolean;
  data: any;

  constructor(private activatedroute:ActivatedRoute,
    private router:Router,
    private repoService:RepositoryService,
    private authService: SocialAuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
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

    this.sub = this.activatedroute.paramMap.subscribe(params => {
      this.id =parseInt(params.get('id'));
      if (this.id > 0 && this.user != null)
      {
        this.repoService.getData('debate/people/'+this.id,this.user)
        .subscribe((res:PeopleDebateItem) => this.peopleDebateItem = res);
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      width: '1800px',
      height: '840px',
      data: 1 //<-- formId
    });
  }
}
