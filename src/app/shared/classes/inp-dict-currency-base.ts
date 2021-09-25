import { EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictCurrElement } from "../models/dictionaries/dict-curr-element";

@Injectable()
export abstract class inpDictCurrencyBase implements ControlValueAccessor, OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictCurrElement;
  @Output() currencyElementEvent = new EventEmitter<dictCurrElement>();
  filteredCurr: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }
  
  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }

  writeValue(incValue: dictCurrElement): void {
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

  searchValue(value: dictCurrElement | string):void {
    if (typeof  value != 'string'){
      return;
    }

    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.errorMsg = "";
    this.filteredCurr = [];
    this.isLoading = true;

    this.dictJournalService.searchJournal(baseId, 'currencies', value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }))
      .subscribe(incData => {
        this.errorMsg = "";
        this.filteredCurr = incData.data;
      },
      err => {
        this.errorMsg = 'no data received';
        this.filteredCurr = [];
      })
  }

  clearSelected(){
    this.writeValue(null);
    this.OnTouched();
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.writeValue(event.option.value);
    this.currencyElementEvent.emit(this.selectedElement);
    this.OnTouched();
  }  

  displayValue(value: dictCurrElement) {
    return value && value.name ? value.name : '';
  }

}