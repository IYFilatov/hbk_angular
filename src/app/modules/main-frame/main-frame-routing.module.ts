import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictJournalComponent } from './components/dict-journal/dict-journal.component';
import { NoSelectionComponent } from './components/no-selection/no-selection.component';
import { DictElCurrencyComponent } from './pages/dict-el-currency/dict-el-currency.component';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';

const routes: Routes = [
  { 
    path: 'dict/:basename',
    component: MainFrameComponent,
    children: [
      { path: 'currencies/:id', component: DictElCurrencyComponent },
      { path: ':dictName', component: DictJournalComponent },
      { path: '', component: NoSelectionComponent }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFrameRoutingModule { }
