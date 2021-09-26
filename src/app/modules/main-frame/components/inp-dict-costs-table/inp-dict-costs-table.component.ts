import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictCostsBase } from 'src/app/shared/classes/inp-dict-costs-base';
import { dictCostElement } from 'src/app/shared/models/dictionaries/dict-cost-element';

@Component({
  selector: 'app-inp-dict-costs-table',
  templateUrl: './inp-dict-costs-table.component.html',
  styleUrls: ['./inp-dict-costs-table.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InpDictCostsTableComponent),
      multi: true
    }
  ]
})
export class InpDictCostsTableComponent extends inpDictCostsBase {

  @Input() selectedElement: dictCostElement;
  @Output() costElementEvent = new EventEmitter<dictCostElement>();

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
