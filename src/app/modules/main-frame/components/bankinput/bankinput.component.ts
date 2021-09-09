import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, finalize, skipWhile } from 'rxjs/operators';

import { DictJournalService } from 'src/app/core/services/dict-journal.service';
import { dictBankElement } from 'src/app/shared/models/dictionaries/dict-bank-element';


@Component({
  selector: 'app-bankinput',
  templateUrl: './bankinput.component.html',
  styleUrls: ['./bankinput.component.css']
})
export class BankinputComponent implements OnInit {

  searchBankCtrl = new FormControl();
  @Input() selectedElement: dictBankElement;
  @Output() bankElementEvent = new EventEmitter<dictBankElement>();
  filteredBanks: Object[];
  isLoading = false;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private dictJournalService: DictJournalService) { }

  ngOnInit(): void {
    this.searchBankCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(v => this.searchValue(v));
  }

  @HostListener('click')
  onClick() {
    if (this.searchBankCtrl && this.searchBankCtrl.untouched) {
      this.searchValue('');
    }
  }

  searchValue(value: dictBankElement | string):void {
    //console.log(`search for ${value}`);
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
    //   this.searchBankCtrl.setValue('');
    this.setValue(null);
  }

  onSelectElement(event: MatAutocompleteSelectedEvent){
    this.setValue(event.option.value);
  }

  setValue(newValue: dictBankElement){
    this.selectedElement = newValue;
    this.bankElementEvent.emit(this.selectedElement);
  }

  displayValue(value: dictBankElement) {
    return value && value.name ? value.name : '';
  }

}
