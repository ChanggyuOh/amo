import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { OwnerModule } from './owner/owner.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { FeedModule } from './feed/feed.module';
import { QuillModule } from 'ngx-quill';
import { UtilsModule } from './utils/utils.module';
import { DebateModule } from './debate/debate.module';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { TvComponent } from './tv/tv.component';
import { TvDialogComponent } from './tv/tv-dialog/tv-dialog.component';
import { environment } from './../environments/environment';
import { PrivacyComponent } from './privacy/privacy.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgTerminalModule } from 'ng-terminal';
import { FinanceModule } from './finance/finance.module';
import { GraphModule } from './graph/graph.module';

export function onMonacoLoad() {
 
  console.log((window as any).monaco);
  let monaco = (<any>window).monaco;
  const uri = monaco.Uri.parse('a://b/foo.json');
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });
 
}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'vs', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SearchDialogComponent,
    TvComponent,
    TvDialogComponent,
    PrivacyComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    OwnerModule,
    FeedModule,
    UtilsModule,
    SharedModule,
    DebateModule,
    NgTerminalModule,
    NgxJsonViewerModule,
    QuillModule.forRoot(),
    MonacoEditorModule.forRoot(monacoConfig),
    FontAwesomeModule,
    FinanceModule,
    GraphModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleKey
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookKey),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
