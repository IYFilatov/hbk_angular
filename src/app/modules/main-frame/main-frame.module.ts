import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CUSTOM_DATE_FORMATS, CustomDatePickerAdapter, CUSTOM_DATETIME_FORMATS } from 'src/app/shared/classes/custom-datepicker-adapter';

import { DictElBankComponent } from './pages/dict-el-bank/dict-el-bank.component';
import { DictElCostComponent } from './pages/dict-el-cost/dict-el-cost.component';
import { DictElIncomeComponent } from './pages/dict-el-income/dict-el-income.component';
import { DictElBankaccountComponent } from './pages/dict-el-bankaccount/dict-el-bankaccount.component';
import { BankinputComponent } from './components/bankinput/bankinput.component';
import { DocAnyJournalComponent } from './components/doc-any-journal/doc-any-journal.component';
import { DocAnyJournalPanelComponent } from './components/doc-any-journal-panel/doc-any-journal-panel.component';
import { DocElIncomeComponent } from './pages/doc-el-income/doc-el-income.component';



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
    DictElCostComponent,
    DictElIncomeComponent,
    DictElBankaccountComponent,    
    BankinputComponent, DocAnyJournalComponent, DocAnyJournalPanelComponent, DocElIncomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatIconModule,
    MatToolbarModule,
    MainFrameRoutingModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { verticalPosition: 'top', duration: 2000 },
    },
    {provide: DateAdapter, useClass: CustomDatePickerAdapter},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS},
  ],
})
export class MainFrameModule {}
