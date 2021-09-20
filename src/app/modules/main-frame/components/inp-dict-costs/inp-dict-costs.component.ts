import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictCostsBase } from 'src/app/shared/classes/inp-dict-costs-base';
import { dictCostElement } from 'src/app/shared/models/dictionaries/dict-cost-element';

@Component({
  selector: 'app-inp-dict-costs',
  templateUrl: './inp-dict-costs.component.html',
  styleUrls: ['./inp-dict-costs.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictCostsComponent),
      multi: true
    }
  ]
})
export class InpDictCostsComponent extends inpDictCostsBase {

  @Input() selectedElement: dictCostElement;
  @Output() costElementEvent = new EventEmitter<dictCostElement>();

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
