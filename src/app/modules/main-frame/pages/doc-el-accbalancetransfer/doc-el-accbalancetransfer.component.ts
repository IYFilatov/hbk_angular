import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { DocElementService } from 'src/app/core/services/doc-element.service';
import { docElBase } from 'src/app/shared/classes/doc-el-base';
import { dictBankAccountElement } from 'src/app/shared/models/dictionaries/dict-BankAccount-element';
import { docAccBalanceTransferElement } from 'src/app/shared/models/documents/doc-accbalancetransfer-element';
import { docExpensesTableElement } from 'src/app/shared/models/documents/doc-expenses-table-element';

@Component({
  selector: 'app-doc-el-accbalancetransfer',
  templateUrl: './doc-el-accbalancetransfer.component.html',
  styleUrls: ['./doc-el-accbalancetransfer.component.css']
})
export class DocElAccbalancetransferComponent extends docElBase implements OnInit {

  curElement: docAccBalanceTransferElement = {
    delmark: false,
    posted: false,
    number: 0,
    date: new Date(),
    accfrom: 0,
    accto: 0,
    amount: 0,
    chargeamount: 0,
    description: '',
    accfromObj: null,
    acctoObj: null
  };

  loadedElement: docAccBalanceTransferElement;

  constructor(protected router: Router, protected route: ActivatedRoute, protected docElementService: DocElementService, protected _snackBar: MatSnackBar) {
    super(router, route, docElementService, _snackBar);
  }

  ngOnInit(): void {
  }

  onLoadElement(accBalanceTransferElement: docAccBalanceTransferElement): docAccBalanceTransferElement {
    accBalanceTransferElement.date = this.converToDate(accBalanceTransferElement.date);

    return accBalanceTransferElement;
  }

  setAccFromElement(bankaccEl: dictBankAccountElement){    
    this.curElement.accfrom = bankaccEl?.number || 0;    
  }

  setAccToElement(bankaccEl: dictBankAccountElement){
    this.curElement.accto = bankaccEl?.number || 0;    
  }

}
