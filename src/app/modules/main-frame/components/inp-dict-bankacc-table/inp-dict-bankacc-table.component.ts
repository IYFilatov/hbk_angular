import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictBankaccBase } from 'src/app/shared/classes/inp-dict-bankacc-base';
import { dictBankAccountElement } from 'src/app/shared/models/dictionaries/dict-BankAccount-element';

@Component({
  selector: 'app-inp-dict-bankacc-table',
  templateUrl: './inp-dict-bankacc-table.component.html',
  styleUrls: ['./inp-dict-bankacc-table.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictBankaccTableComponent),
      multi: true
    }
  ]
})
export class InpDictBankaccTableComponent extends inpDictBankaccBase {

  @Input() selectedElement: dictBankAccountElement;
  @Output() bankaccElementEvent = new EventEmitter<dictBankAccountElement>();

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
