import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from "../../shared/user.service";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchDialogComponent } from '../../search-dialog/search-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  user: SocialUser;
  loggedIn: boolean;
  // create a field to hold error messages so we can bind it to our template
  resultMessage: string;
  searchData: string;

  constructor(public dialog: MatDialog,
    private authService: SocialAuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }
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
      if (user != null) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '100%',
      height: '600px',
      data: this.searchData,
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }
  signInWithGoogle(): void {
    this.authService
    .signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(
      (response) => {
        // Get all user details
        console.log(GoogleLoginProvider.PROVIDER_ID + ' logged in user data is=', response);
        this.user = response;
        this.userService.login('',response)
        .subscribe(
          result => {
            console.log('success', result);
            //this.route.navigate(['/home']);
          }
        )
      },
      (error) => {
        console.log(error);
        this.resultMessage = error;
      }
    );
  }

  signInWithFB(): void {
    this.authService
    .signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(
      (response) => {
        // Get all user details
        console.log(FacebookLoginProvider.PROVIDER_ID + ' logged in user data is=', response);
        this.user = response;
        this.userService.login('',response)
        .subscribe(
          result => {
            console.log('success', result);
            //this.route.navigate(['/home']);
          }
        ),
        error => {
          this.resultMessage = 'it didn\'t work and that sucks';
          console.log(error);
        }
      }
    );
  }

  signInWithAmazon(): void {
    this.snackBar.open("Amazon OAuth is coming soon. Use google or facebook OAuth",null,{
      duration:2000,
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
