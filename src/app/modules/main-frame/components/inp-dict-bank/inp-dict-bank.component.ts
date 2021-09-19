import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictBankBase } from 'src/app/shared/classes/inp-dict-bank-base';
import { dictBankElement } from 'src/app/shared/models/dictionaries/dict-bank-element';

@Component({
  selector: 'app-inp-dict-bank',
  templateUrl: './inp-dict-bank.component.html',
  styleUrls: ['./inp-dict-bank.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictBankComponent),
      multi: true
    }
  ]
})
export class InpDictBankComponent extends inpDictBankBase {

  @Input() selectedElement: dictBankElement;
  @Output() bankElementEvent = new EventEmitter<dictBankElement>();

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
