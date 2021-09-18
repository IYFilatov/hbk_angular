import { EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictBankElement } from "../models/dictionaries/dict-bank-element";

@Injectable()
export abstract class inpDictBankBase implements ControlValueAccessor, OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictBankElement;
  @Output() bankElementEvent = new EventEmitter<dictBankElement>();
  filteredBanks: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }
  
  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }

  writeValue(incValue: dictBankElement): void {
    this.selectedElement = incValue;
    this.onChange(this.selectedElement);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }  

  onChange: any = () => {}
  OnTouched: any = () => {}

  searchValue(value: dictBankElement | string):void {
    if (typeof  value != 'string'){
      return;
    }

    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.errorMsg = "";
    this.filteredBanks = [];
    this.isLoading = true;

    this.dictJournalService.searchJournal(baseId, 'banks', value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }))
      .subscribe(incData => {
        this.errorMsg = "";
        this.filteredBanks = incData.data;
      },
      err => {
        this.errorMsg = 'no data received';
        this.filteredBanks = [];
      })
  }

  clearSelected(){
    this.writeValue(null);
    this.OnTouched();
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.writeValue(event.option.value);
    this.bankElementEvent.emit(this.selectedElement);
    this.OnTouched();
  }  

  displayValue(value: dictBankElement) {
    return value && value.name ? value.name : '';
  }

}