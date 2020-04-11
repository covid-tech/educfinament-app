import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'activity/:id',
    loadChildren: () => import('./pages/activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'new-activity',
    loadChildren: () => import('./pages/new-activity/new-activity.module').then( m => m.NewActivityPageModule)
  },
  {
    path: 'new-activity/:id',
    loadChildren: () => import('./pages/new-activity/new-activity.module').then( m => m.NewActivityPageModule)
  },
  {
    path: 'upload-avatar-page',
    loadChildren: () => import('./pages/upload-avatar-page/upload-avatar.module').then( m => m.UploadAvatarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
