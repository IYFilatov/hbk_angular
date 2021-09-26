import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictCurrencyBase } from 'src/app/shared/classes/inp-dict-currency-base';
import { dictCurrElement } from 'src/app/shared/models/dictionaries/dict-curr-element';

@Component({
  selector: 'app-inp-dict-currency',
  templateUrl: './inp-dict-currency.component.html',
  styleUrls: ['./inp-dict-currency.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictCurrencyComponent),
      multi: true
    }
  ]
})
export class InpDictCurrencyComponent extends inpDictCurrencyBase {

  @Input() placeholderText: String = 'Currency';
  @Input() selectedElement: dictCurrElement;
  @Output() currencyElementEvent = new EventEmitter<dictCurrElement>();

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
