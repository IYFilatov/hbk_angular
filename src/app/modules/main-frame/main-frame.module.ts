import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFrameRoutingModule } from './main-frame-routing.module';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';

import { AotComponent } from './components/aot/aot.component';
import { NoSelectionComponent } from './components/no-selection/no-selection.component';
import { DictJournalComponent } from './components/dict-journal/dict-journal.component';

import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AotComponent,
    MainFrameComponent,
    NoSelectionComponent,
    DictJournalComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MainFrameRoutingModule    
  ]
})
export class MainFrameModule { }
