import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DictElementService } from 'src/app/core/services/dict-element.service';
import { dictElBase } from 'src/app/shared/classes/dict-el-base';
import { dictBankElement } from 'src/app/shared/models/dictionaries/dict-bank-element';

@Component({
  selector: 'app-dict-el-bank',
  templateUrl: './dict-el-bank.component.html',
  styleUrls: ['./dict-el-bank.component.css']
})
export class DictElBankComponent extends dictElBase implements OnInit {

  curElement: dictBankElement = {
    number: 0,
    name: '',
    code: '',    
    internalcode: '',
    phone: ''
  };
  
  loadedElement: dictBankElement;
  
  constructor(protected router: Router, protected route: ActivatedRoute, protected dictElementService: DictElementService) {
    super(router, route, dictElementService);    
  }
  
  ngOnInit(): void {
  }

}
