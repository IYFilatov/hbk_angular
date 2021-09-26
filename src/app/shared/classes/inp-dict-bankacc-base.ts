import { EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, finalize } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { DictJournalService } from "src/app/core/services/dict-journal.service";
import { dictBankAccountElement } from "../models/dictionaries/dict-BankAccount-element";

@Injectable()
export abstract class inpDictBankaccBase implements ControlValueAccessor, OnInit {

  searchCtrl = new FormControl();
  @Input() selectedElement: dictBankAccountElement;
  @Output() bankaccElementEvent = new EventEmitter<dictBankAccountElement>();
  filteredBankacc: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(protected router: Router, protected route: ActivatedRoute, protected dictJournalService: DictJournalService) { }
  
  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }

  writeValue(incValue: dictBankAccountElement): void {
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
    this.writeValue(null);
    this.OnTouched();
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.writeValue(event.option.value);
    this.bankaccElementEvent.emit(this.selectedElement);
    this.OnTouched();
  }  

  isSelected(): boolean{
    return this.selectedElement?.number !== undefined;
  }

  openSelected(){
    const baseId = this.route.parent.snapshot.paramMap.get('basename');
    
    this.router.navigate([`/dict/${baseId}/bankaccounts/${this.selectedElement.number}`])
  }

  displayValue(value: dictBankAccountElement) {
    return value && value.accnumber ? value.accnumber : '';
  }

}