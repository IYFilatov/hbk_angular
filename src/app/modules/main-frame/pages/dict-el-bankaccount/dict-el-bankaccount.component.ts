import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DictElementService } from 'src/app/core/services/dict-element.service';
import { CUSTOM_DATE_FORMATS } from 'src/app/shared/classes/custom-datepicker-adapter';

import { dictElBase } from 'src/app/shared/classes/dict-el-base';
import { dictBankElement } from 'src/app/shared/models/dictionaries/dict-bank-element';
import { dictBankAccountElement } from 'src/app/shared/models/dictionaries/dict-BankAccount-element';

@Component({
  selector: 'app-dict-el-bankaccount',
  templateUrl: './dict-el-bankaccount.component.html',
  styleUrls: ['./dict-el-bankaccount.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
  ],
})
export class DictElBankaccountComponent extends dictElBase implements OnInit {
  curElement: dictBankAccountElement = {
    number: 0,
    description: '',
    accnumber: '',
    bankid: 0,
    opened_at: new Date(),
    closed_at: null,
    bankObj: null,
  };

  loadedElement: dictBankAccountElement;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected dictElementService: DictElementService
  ) {
    super(router, route, dictElementService);
  }

  ngOnInit(): void {}

  onLoadElement(incomeElement: dictBankAccountElement): dictBankAccountElement {
    incomeElement.opened_at = this.converToDate(incomeElement.opened_at);
    incomeElement.closed_at = this.converToDate(incomeElement.closed_at);

    return incomeElement;
  }

  setBankElement(bankEl: dictBankElement){
    this.curElement.bankObj = bankEl;
    this.curElement.bankid = bankEl?.number || 0;
  }

  converToDate(v: any): Date {
    let ret: Date = null;
    if (v) {
      ret = new Date(v);
    }
    return ret;
  }
}
