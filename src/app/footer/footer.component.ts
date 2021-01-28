import { Component, OnInit } from '@angular/core';
import { faTwitter, faFacebook, faInstagram, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  twitter = faTwitter;
  facebook = faFacebook;
  instagram  = faInstagram;
  github = faGithub;
  linkedin = faLinkedin;
  youtube = faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
