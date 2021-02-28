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
import { TournamentBracketComponent } from '../../utils/tournament-bracket/tournament-bracket.component';
@Component({
  selector: 'app-people-debate',
  templateUrl: './people-debate.component.html',
  styleUrls: ['./people-debate.component.css']
})
export class PeopleDebateComponent implements OnInit {
  sub: any;
  public id: number;
  public peopleDebateItem: PeopleDebateItem;
  public candidateData: PeopleDebateCandidateItem[];
  public candidates: CandidateItem[];
  isPageLoaded = false;
  user: SocialUser;
  loggedIn: boolean;
  data: any;
  step:number = 0;
  showDetailCssClass: string = "showCandidateDetail";

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
          // get debate data
          this.repoService.getData('debate/people/'+this.id,this.user)
          .subscribe((res:any) => {
            this.peopleDebateItem = res;
            // console.log("peopleDebateDate:"+res.title);
          });

          // get candidates data
          this.repoService.getData(`debate/people/${this.id}/candidate`,this.user)
          .subscribe((res:PeopleDebateCandidateItem[]) => {
            this.candidateData = res;
            this.candidates = new Array();
            for(let i=0; i < res.length; i++) {
              var candidate: any = res[i].candidate;
              (candidate as CandidateItem).id = res[i].id;
              (candidate as CandidateItem).debateId = res[i].debateId;
              this.candidates.push(candidate);
              console.log(this.candidates[i]);
            }
          });
        }
      });
     }

  ngOnInit(): void {
    this.isPageLoaded =false;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
      width: '700px',
      height: '640px',
      data: environment.peopleDebateFormId
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null)
      {
        var newCandidate = this.addNewCandidate("",result);
        var postData = {debateId: this.id, candidate: result };
        this.repoService.create("debate/people/candidate", postData, null)
        .subscribe((res:any) => newCandidate.id = res);
      }
    });
  }
  addNewCandidate = (candidateId: string, candiateFromDialog: CandidateItem): CandidateItem => {
    if (candiateFromDialog != null)
    {
      var candidate: CandidateItem ={    
        id: candidateId,
        debateId: this.id,
        firstname: candiateFromDialog.firstname,
        lastname: candiateFromDialog.lastname,
        phoneNumber: "",
        candidatesPictureLink: candiateFromDialog.candidatesPictureLink,
        candidatesPublicProfileLink: candiateFromDialog.candidatesPublicProfileLink,
        email1: "",
        comment: candiateFromDialog.comment,
        supports: null};

      this.candidates.push(candidate);
      return candidate;
    }
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

  setStep = (index: number) => {
    this.step = index;
    var card = document.getElementById("candidateCard"+index);
    console.log("target:"+card);
    // if (!card.classList.contains(this.showDetailCssClass)){
    //   card.classList.add(this.showDetailCssClass);
    // }
    card.scrollIntoView(true);
    card.scrollTo(0,0);
  }

  nextStep = () => {
    this.step++;
  }
  prevStep = () => {
    this.step--;
  }
  removeFullWidth = (index: number) => {
    var card = document.getElementById("candidateCard"+index);
    if (card && card.classList.contains(this.showDetailCssClass))
      card.classList.remove(this.showDetailCssClass);
  }

}
