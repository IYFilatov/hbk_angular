import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DictElementService } from 'src/app/core/services/dict-element.service';
import { dictElBase } from 'src/app/shared/classes/dict-el-base';
import { dictCurrElement } from 'src/app/shared/models/dictionaries/dict-curr-element';

@Component({
  selector: 'app-dict-el-currency',
  templateUrl: './dict-el-currency.component.html',
  styleUrls: ['./dict-el-currency.component.css']
})
export class DictElCurrencyComponent extends dictElBase implements OnInit {

  // formCurrElement: FormGroup = new FormGroup({
  //   number: new FormControl('', Validators.maxLength(11)),
  //   name: new FormControl('', Validators.maxLength(255)),
  //   code: new FormControl('', Validators.maxLength(3)),
  //   symbol: new FormControl('', Validators.maxLength(5))    
  // });

  curElement: dictCurrElement = {
    number: 0,
    name: '',
    code: '',
    symbol: ''
  };
  
  loadedElement: dictCurrElement;  
  
  constructor(protected router: Router, protected route: ActivatedRoute, protected dictElementService: DictElementService) {
    super(router, route, dictElementService);    
  }
  
  ngOnInit(): void {    
  }  

}
