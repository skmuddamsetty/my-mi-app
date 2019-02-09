import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionAnswerListPage } from './question-answer-list.page';
import { MatIconModule, MatButtonToggleModule, MatButtonModule, MatExpansionModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: QuestionAnswerListPage
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
    MatIconModule
  ],
  declarations: [QuestionAnswerListPage]
})
export class QuestionAnswerListPageModule { }
