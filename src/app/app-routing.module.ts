import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './modules/error-pages/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dict/DEF', pathMatch: 'full' },
  //{ path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
