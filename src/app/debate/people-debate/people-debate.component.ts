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
import { environment} from '../../../environments/environment'
import { env } from 'process';
import { PeopleDebateCandidateItem, CandidateItem, OpinionItem } from '../../_interface/people-debate-candidate.model';
@Component({
  selector: 'app-people-debate',
  templateUrl: './people-debate.component.html',
  styleUrls: ['./people-debate.component.css']
})
export class PeopleDebateComponent implements OnInit {
  sub: any;
  public id: number;
  public peopleDebateItem: PeopleDebateItem;
  public candidates: PeopleDebateCandidateItem[];
  user: SocialUser;
  loggedIn: boolean;
  data: any;

  constructor(private activatedroute:ActivatedRoute,
    private router:Router,
    private repoService:RepositoryService,
    private authService: SocialAuthService,
    public dialog: MatDialog
    ) {
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
          .subscribe((res:any) => {
            this.peopleDebateItem = res;
            console.log("peopleDebateDate:"+res.title);
          });
          this.repoService.getData(`debate/people/${this.id}/candidate`,this.user)
          .subscribe((res:PeopleDebateCandidateItem[]) => {
            this.candidates = res;
            for(let i=0; i < res.length; i++) {
              console.log("candidateId:"+res[i].id);
              console.log("debateId:"+res[i].debateId);
              console.log(res[i]);
            }
          });
        }
      });
     }

  ngOnInit(): void {
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      width: '1800px',
      height: '840px',
      data: environment.peopleDebateFormId
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
      if (result != null)
      {
        var newCandidate = {debateId: this.id, candidate: result };
        this.repoService.create("debate/people/candidate", newCandidate, null)
        .subscribe((res:any) => {
          this.peopleDebateItem = res;
          console.log("candidateId:"+res);
        });
        console.log(result);
      }
    });
  }
  toggleCandidateView = (isListView:boolean) => {
    var view = document.getElementById("my-candidates");
    if (isListView && view.classList.contains("my-candidate-ul-click"))
    {
      view.classList.toggle("my-candidate-ul-click");
      for(let i=0; i < view.children.length; i++)
        view.children[i].classList.toggle("my-candidate-li-click");
    }
    if (!isListView && !view.classList.contains("my-candidate-ul-click"))
    {
      view.classList.toggle("my-candidate-ul-click");
      for(let i=0; i < view.children.length; i++)
        view.children[i].classList.toggle("my-candidate-li-click");
    }
  }
}
