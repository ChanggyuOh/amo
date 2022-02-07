import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TvComponent } from '../tv/tv.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { FinanceComponent } from '../finance/finance.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'owner', loadChildren: () => import('../owner/owner.module').then(m => m.OwnerModule) }, 
  { path: 'feed', loadChildren: () => import('../feed/feed.module').then(m => m.FeedModule)},
  { path: 'debate', loadChildren: () => import('../debate/debate.module').then(m => m.DebateModule)},
  { path: 'tv', component: TvComponent},
  { path: 'graph', loadChildren: () => import('../graph/graph.module').then(m => m.GraphModule)},
  { path: 'utils', loadChildren: () => import('../utils/utils.module').then(m => m.UtilsModule)},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'finance', loadChildren: () => import('../finance/finance.module').then(m=>m.FinanceModule)},
  { path: '', component: HomeComponent}
  // { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
