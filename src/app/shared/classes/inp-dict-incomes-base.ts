import { EventEmitter, HostListener, Injectable, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictIncomeElement } from "../models/dictionaries/dict-income-element";

@Injectable()
export abstract class inpDictIncomesBase implements ControlValueAccessor, OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictIncomeElement;
  @Output() incomeElementEvent = new EventEmitter<dictIncomeElement>();
  filteredIncomes: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected router: Router, protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }    

  writeValue(incValue: dictIncomeElement): void {
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
    this.writeValue(null);
    this.OnTouched();
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.writeValue(event.option.value);
    this.incomeElementEvent.emit(this.selectedElement);
    this.OnTouched();
  }  

  isSelected(): boolean{
    return this.selectedElement?.number !== undefined;
  }

  openSelected(){
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.router.navigate([`/dict/${baseId}/incomes/${this.selectedElement.number}`])
  }

  displayValue(value: dictIncomeElement) {
    return value && value.name ? value.name : '';
  }

}