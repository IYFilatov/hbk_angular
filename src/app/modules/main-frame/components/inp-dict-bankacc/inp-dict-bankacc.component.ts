import { Component, EventEmitter, forwardRef, HostListener, Input, Output} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictBankaccBase } from 'src/app/shared/classes/inp-dict-bankacc-base';
import { dictBankAccountElement } from 'src/app/shared/models/dictionaries/dict-BankAccount-element';

@Component({
  selector: 'app-inp-dict-bankacc',
  templateUrl: './inp-dict-bankacc.component.html',
  styleUrls: ['./inp-dict-bankacc.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictBankaccComponent),
      multi: true
    }
  ]
})
export class InpDictBankaccComponent extends inpDictBankaccBase {

  @Input() placeholderText: String = 'Bank account';
  @Input() selectedElement: dictBankAccountElement;
  @Output() bankaccElementEvent = new EventEmitter<dictBankAccountElement>();

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
