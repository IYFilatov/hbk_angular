import { EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictCostElement } from "../models/dictionaries/dict-cost-element";

@Injectable()
export abstract class inpDictCostsBase implements ControlValueAccessor, OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictCostElement;
  @Output() costElementEvent = new EventEmitter<dictCostElement>();
  filteredCosts: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }    

  writeValue(costValue: dictCostElement): void {
    this.selectedElement = costValue;
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

  searchValue(value: dictCostElement | string):void {
    //console.log(`search for ${value}`);
    if (typeof  value != 'string'){
      return;
    }

    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.errorMsg = "";
    this.filteredCosts = [];
    this.isLoading = true;

    this.dictJournalService.searchJournal(baseId, 'costs', value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }))
      .subscribe(costData => {
        this.errorMsg = "";
        this.filteredCosts = costData.data;
      },
      err => {
        this.errorMsg = 'no data received';
        this.filteredCosts = [];
      })
  }

  clearSelected(){
    this.writeValue(null);
    this.OnTouched();
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.writeValue(event.option.value);
    this.costElementEvent.emit(this.selectedElement);
    this.OnTouched();
  }  

  displayValue(value: dictCostElement) {
    return value && value.name ? value.name : '';
  }

}