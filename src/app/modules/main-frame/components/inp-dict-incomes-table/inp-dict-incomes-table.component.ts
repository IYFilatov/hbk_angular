import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictIncomesBase } from 'src/app/shared/classes/inp-dict-incomes-base';
import { dictIncomeElement } from 'src/app/shared/models/dictionaries/dict-income-element';

@Component({
  selector: 'app-inp-dict-incomes-table',
  templateUrl: './inp-dict-incomes-table.component.html',
  styleUrls: ['./inp-dict-incomes-table.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictIncomesTableComponent),
      multi: true
    }
  ]
})
export class InpDictIncomesTableComponent extends inpDictIncomesBase {
  
  @Input() selectedElement: dictIncomeElement;
  @Output() incomeElementEvent = new EventEmitter<dictIncomeElement>();

  constructor(protected router: Router, protected route: ActivatedRoute, protected dictJournalService: DictJournalService) {    
    super(router, route, dictJournalService);
  }
 
  @HostListener('click')
  onClick() {
    if (this.searchCtrl && this.searchCtrl.untouched) {
      this.searchValue('');
    }
  }
  

}
