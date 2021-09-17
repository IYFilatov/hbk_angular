import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictIncomesBase } from 'src/app/shared/classes/inp-dict-incomes-base';

@Component({
  selector: 'app-inp-dict-incomes',
  templateUrl: './inp-dict-incomes.component.html',
  styleUrls: ['./inp-dict-incomes.component.css']
})
export class InpDictIncomesComponent extends inpDictIncomesBase {

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
