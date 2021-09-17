import { Component, EventEmitter, HostListener, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictIncomesBase } from 'src/app/shared/classes/inp-dict-incomes-base';
import { dictIncomeElement } from 'src/app/shared/models/dictionaries/dict-income-element';

@Component({
  selector: 'app-inp-dict-incomes-table',
  templateUrl: './inp-dict-incomes-table.component.html',
  styleUrls: ['./inp-dict-incomes-table.component.css']
})
export class InpDictIncomesTableComponent extends inpDictIncomesBase {
  
  @Output() incomeElementEvent = new EventEmitter<dictIncomeElement>();

  constructor(protected route: ActivatedRoute, protected dictJournalService: DictJournalService) {
    super(route, dictJournalService);
  }

  @HostListener('click')
  onClick() {
    if (this.searchCtrl && this.searchCtrl.untouched) {
      this.searchValue('');
    }
  }

}
