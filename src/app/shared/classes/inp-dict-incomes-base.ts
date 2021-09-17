import { EventEmitter, HostListener, Injectable, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictIncomeElement } from "../models/dictionaries/dict-income-element";

@Injectable()
export abstract class inpDictIncomesBase implements OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictIncomeElement;
  @Output() incomeElementEvent = new EventEmitter<dictIncomeElement>();
  filteredIncomes: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }    

  searchValue(value: dictIncomeElement | string):void {
    //console.log(`search for ${value}`);
    if (typeof  value != 'string'){
      return;
    }

    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.errorMsg = "";
    this.filteredIncomes = [];
    this.isLoading = true;

    this.dictJournalService.searchJournal(baseId, 'incomes', value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }))
      .subscribe(incData => {
        this.errorMsg = "";
        this.filteredIncomes = incData.data;
      },
      err => {
        this.errorMsg = 'no data received';
        this.filteredIncomes = [];
      })
  }

  clearSelected(){
    this.setValue(null);
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.setValue(event.option.value);
  }

  setValue(newValue: dictIncomeElement){
    this.selectedElement = newValue;
    this.incomeElementEvent.emit(this.selectedElement);
  }

  displayValue(value: dictIncomeElement) {
    return value && value.name ? value.name : '';
  }

}