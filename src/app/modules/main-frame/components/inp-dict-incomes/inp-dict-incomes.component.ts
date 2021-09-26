import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictIncomesBase } from 'src/app/shared/classes/inp-dict-incomes-base';
import { dictIncomeElement } from 'src/app/shared/models/dictionaries/dict-income-element';

@Component({
  selector: 'app-inp-dict-incomes',
  templateUrl: './inp-dict-incomes.component.html',
  styleUrls: ['./inp-dict-incomes.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictIncomesComponent),
      multi: true
    }
  ]
})
export class InpDictIncomesComponent extends inpDictIncomesBase {

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
