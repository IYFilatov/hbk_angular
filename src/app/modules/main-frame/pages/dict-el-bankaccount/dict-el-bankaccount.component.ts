import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DictElementService } from 'src/app/core/services/dict-element.service';

import { dictElBase } from 'src/app/shared/classes/dict-el-base';
import { dictBankAccountElement } from 'src/app/shared/models/dictionaries/dict-BankAccount-element';

@Component({
  selector: 'app-dict-el-bankaccount',
  templateUrl: './dict-el-bankaccount.component.html',
  styleUrls: ['./dict-el-bankaccount.component.css']
})
export class DictElBankaccountComponent extends dictElBase implements OnInit {

  curElement: dictBankAccountElement = {
    number: 0,
    description: '',
    accnumber: '',
    bankid: 0,
    opened_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    closed_at: null
  };
  
  loadedElement: dictBankAccountElement;

  constructor(protected router: Router, protected route: ActivatedRoute, protected dictElementService: DictElementService) {
    super(router, route, dictElementService);
  }

  ngOnInit(): void {
  }


}
