import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeopleDebateComponent } from './people-debate/people-debate.component';
import { PeopleDebateListComponent } from './people-debate-list/people-debate-list.component';
const routes: Routes = [
  { path: 'people-debate/:id', component: PeopleDebateComponent },
  { path: 'people-debate-list', component: PeopleDebateListComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebateRoutingModule { }
