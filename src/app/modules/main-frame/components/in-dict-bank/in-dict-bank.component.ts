import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictBankBase } from 'src/app/shared/classes/inp-dict-bank-base';
import { dictBankElement } from 'src/app/shared/models/dictionaries/dict-bank-element';

@Component({
  selector: 'app-in-dict-bank',
  templateUrl: './in-dict-bank.component.html',
  styleUrls: ['./in-dict-bank.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InDictBankComponent),
      multi: true
    }
  ]
})
export class InDictBankComponent extends inpDictBankBase {

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
