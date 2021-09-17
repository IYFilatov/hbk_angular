import { EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictBankAccountElement } from "../models/dictionaries/dict-BankAccount-element";

@Injectable()
export abstract class inpDictBankaccBase implements OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictBankAccountElement;
  @Output() bankaccElementEvent = new EventEmitter<dictBankAccountElement>();
  filteredBankacc: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }    

  searchValue(value: dictBankAccountElement | string):void {
    if (typeof  value != 'string'){
      return;
    }

    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.errorMsg = "";
    this.filteredBankacc = [];
    this.isLoading = true;

    this.dictJournalService.searchJournal(baseId, 'bankaccounts', value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }))
      .subscribe(incData => {
        this.errorMsg = "";
        this.filteredBankacc = incData.data;
      },
      err => {
        this.errorMsg = 'no data received';
        this.filteredBankacc = [];
      })
  }

  clearSelected(){
    this.setValue(null);
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.setValue(event.option.value);
  }

  setValue(newValue: dictBankAccountElement){
    this.selectedElement = newValue;
    this.bankaccElementEvent.emit(this.selectedElement);
  }

  displayValue(value: dictBankAccountElement) {
    return value && value.accnumber ? value.accnumber : '';
  }

}