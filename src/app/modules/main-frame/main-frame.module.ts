import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFrameRoutingModule } from './main-frame-routing.module';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';

import { AotComponent } from './components/aot/aot.component';
import { NoSelectionComponent } from './components/no-selection/no-selection.component';
import { DictJournalComponent } from './components/dict-journal/dict-journal.component';
import { DictElCurrencyComponent } from './pages/dict-el-currency/dict-el-currency.component';

import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AotComponent,
    MainFrameComponent,
    NoSelectionComponent,
    DictJournalComponent,
    DictElCurrencyComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MainFrameRoutingModule    
  ]
})
export class MainFrameModule { }
