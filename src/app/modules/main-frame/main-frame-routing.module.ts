import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictJournalComponent } from './components/dict-journal/dict-journal.component';
import { DocAnyJournalComponent } from './components/doc-any-journal/doc-any-journal.component';
import { NoSelectionComponent } from './components/no-selection/no-selection.component';
import { DictElBankComponent } from './pages/dict-el-bank/dict-el-bank.component';
import { DictElBankaccountComponent } from './pages/dict-el-bankaccount/dict-el-bankaccount.component';
import { DictElCostComponent } from './pages/dict-el-cost/dict-el-cost.component';
import { DictElCurrencyComponent } from './pages/dict-el-currency/dict-el-currency.component';
import { DictElIncomeComponent } from './pages/dict-el-income/dict-el-income.component';
import { DocElIncomeComponent } from './pages/doc-el-income/doc-el-income.component';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';

const routes: Routes = [
  { 
    path: 'app/:basename', component: MainFrameComponent,
    children: [
      { path: '**', component: NoSelectionComponent }
    ]
  },
  { 
    path: 'dict/:basename',
    component: MainFrameComponent,
    children: [
      { path: 'currencies/:id', component: DictElCurrencyComponent },
      { path: 'banks/:id', component: DictElBankComponent },
      { path: 'costs/:id', component: DictElCostComponent },
      { path: 'incomes/:id', component: DictElIncomeComponent },
      { path: 'bankaccounts/:id', component: DictElBankaccountComponent },
      { path: ':dictName', component: DictJournalComponent },
      { path: '', component: NoSelectionComponent }
    ]
  },
  { 
    path: 'doc/:basename',
    component: MainFrameComponent,
    children: [
      { path: 'incomes/:id', component: DocElIncomeComponent },
      //{ path: 'costs/:id', component: DocElCostComponent },
      { path: ':docName', component: DocAnyJournalComponent },
      { path: '', component: NoSelectionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFrameRoutingModule { }
