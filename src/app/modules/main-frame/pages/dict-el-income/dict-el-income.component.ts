import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DictElementService } from 'src/app/core/services/dict-element.service';

import { dictElBase } from 'src/app/shared/classes/dict-el-base';
import { dictIncomeElement } from 'src/app/shared/models/dictionaries/dict-income-element';

@Component({
  selector: 'app-dict-el-income',
  templateUrl: './dict-el-income.component.html',
  styleUrls: ['./dict-el-income.component.css']
})
export class DictElIncomeComponent extends dictElBase implements OnInit {

  curElement: dictIncomeElement = {
    number: 0,
    name: '',
    description: ''
  };
  
  loadedElement: dictIncomeElement;

  constructor(protected router: Router, protected route: ActivatedRoute, protected dictElementService: DictElementService) {
    super(router, route, dictElementService);
  }

  ngOnInit(): void {
  }

}
