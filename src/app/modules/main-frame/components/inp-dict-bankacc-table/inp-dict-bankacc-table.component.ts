import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { inpDictBankaccBase } from 'src/app/shared/classes/inp-dict-bankacc-base';

@Component({
  selector: 'app-inp-dict-bankacc-table',
  templateUrl: './inp-dict-bankacc-table.component.html',
  styleUrls: ['./inp-dict-bankacc-table.component.css']
})
export class InpDictBankaccTableComponent extends inpDictBankaccBase {

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
