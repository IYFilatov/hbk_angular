import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainFrameRoutingModule } from './main-frame-routing.module';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';

import { AotComponent } from './components/aot/aot.component';
import { NoSelectionComponent } from './components/no-selection/no-selection.component';
import { DictJournalComponent } from './components/dict-journal/dict-journal.component';
import { DictElCurrencyComponent } from './pages/dict-el-currency/dict-el-currency.component';
import { FormCloseButtonsComponent } from './components/form-close-buttons/form-close-buttons.component';
import { DictJournalPanelComponent } from './components/dict-journal-panel/dict-journal-panel.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DictElBankComponent } from './pages/dict-el-bank/dict-el-bank.component';
import { DictElCostComponent } from './pages/dict-el-cost/dict-el-cost.component';


@NgModule({
  declarations: [
    AotComponent,
    MainFrameComponent,
    NoSelectionComponent,
    DictJournalComponent,
    DictElCurrencyComponent,
    FormCloseButtonsComponent,
    DictJournalPanelComponent,
    DictElBankComponent,
    DictElCostComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MainFrameRoutingModule    
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {verticalPosition: 'top', duration: 2000}}
  ]
})
export class MainFrameModule { }
