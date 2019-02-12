import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InterviewListPage } from './interview-list.page';
import {
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatExpansionModule,
  MatToolbarModule
} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: InterviewListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [InterviewListPage]
})
export class InterviewListPageModule {}
