import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'questions/:category',
    loadChildren:
      './question-answer-list/question-answer-list.module#QuestionAnswerListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsPageModule'
  },
  {
    path: 'theme-selector',
    loadChildren:
      './theme-selector/theme-selector.module#ThemeSelectorPageModule'
  },
  {
    path: 'interview/:id',
    loadChildren: './interview/interview.module#InterviewPageModule'
  },
  {
    path: 'interview-list',
    loadChildren:
      './interview-list/interview-list.module#InterviewListPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
